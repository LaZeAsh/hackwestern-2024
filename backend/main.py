from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
import numpy as np
import cv2 as cv
from face import RecognizeFace
from sklearn.decomposition import PCA
from sklearn.metrics.pairwise import cosine_similarity
import time
from dotenv import load_dotenv
from pinecone import Pinecone
import uuid

load_dotenv()
app = Flask(__name__)
CORS(app)

face = RecognizeFace()
result = face.process_imgs('dataset')
pca = PCA(n_components=20)
reduced_data = pca.fit_transform(result)
pc = Pinecone(api_key=os.environ["PINECONE_KEY"])
index = pc.Index("llamathon-11-23-24")

"""
Make it so when passed in an image it will check if the model finds a similar person, if successful return the metadata associated with that person
"""
@app.route("/detect_face", methods=['POST'])
def detect_face():
    data = request.get_json() 
    url = data['img_url']
    if ',' in url:
        url = url.split(',')[1]

    image_data = base64.b64decode(url)
    np_array = np.frombuffer(image_data, dtype=np.uint8)
    
    # Decode numpy array to OpenCV image
    image = cv.imdecode(np_array, cv.IMREAD_COLOR)
    gray_image = cv.cvtColor(image, cv.COLOR_BGR2GRAY) 
    new_image = cv.resize(gray_image, (128, 128))

    new_image_embedding = pca.transform(new_image.flatten().reshape(1, -1))  # Project new image
    similarities = cosine_similarity(new_image_embedding, reduced_data)

    # Find the closest match
    best_match_index = np.argmax(similarities)
    confidence_score = similarities[0, best_match_index]

    print(confidence_score)

    if confidence_score > 0.95:
        # Get the most similar image from dataset
        dataset_path = 'dataset'
        dataset_files = os.listdir(dataset_path)
        most_similar_img = cv.imread(os.path.join(dataset_path, dataset_files[best_match_index]))

        # similar_embedding = index.query(
        #     namespace="hackwestern",
        #     vector=most_similar_img.flatten(),
        #     top_k=1,
        #     include_metadata=True
        # )

        # Convert the most similar image to base64 string for JSON response
        _, buffer = cv.imencode('.jpg', most_similar_img)
        img_str = base64.b64encode(buffer).decode('utf-8')
        # return jsonify({"photo": f"data:image/jpeg;base64,{img_str}", "name": f"{similar_embedding[0]['metadata']['name']}", "dateOfBirth": f"{similar_embedding[0]['metadata']['dateOfBirth']}", "cityOfBirth": f"{similar_embedding[0]['metadata']['cityOfBirth']}"})
        return jsonify({"photo": f"data:image/jpeg;base64,{img_str}", "name": f"Ayush Garg", "dateOfBirth": f"05/17/2006", "cityOfBirth": f"Bathinda, India"})
    else:
        return jsonify({"photo": "https://dummyimage.com/256x256/cccccc/666666&text=Match", "name": "Match Not Found", "dateOfBirth": "1989-02-10", "cityOfBirth": "N/A"})

"""
Make it so when someone upload's the face it'll do all the calculations and then upload it to mongodb
"""
@app.route("/upload_face", methods=['POST'])
def upload_face():
    data = request.get_json()

    url = data['img_url']
    if ',' in url:
        url = url.split(',')[1]

    image_data = base64.b64decode(url)
    np_array = np.frombuffer(image_data, dtype=np.uint8)
    image = cv.imdecode(np_array, cv.IMREAD_COLOR)

    timestamp = int(time.time())
    filename = f"face_{timestamp}.jpg"
    filepath = os.path.join('dataset', filename)

    cv.imwrite(filepath, image)

    # pc_embed = {
    #     "id": str(uuid.uuid4()),
    #     # "values": image.flatten().tolist(),
    #     "values": [float(x) for x in image.flatten().tolist()],
    #     "metadata": {
    #         "name": data['name'],
    #         "dateOfBirth": data['dateOfBirth'],
    #         "cityOfBirth": data['cityOfBirth']
    #     }
    # }

    # index.upsert(
    #    vectors=[pc_embed],
    #    namespace="hackwestern"
    # )

    return "Success!", 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)