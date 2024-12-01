import numpy as np
import cv2 as cv
import os
from typing import List
from sklearn.decomposition import PCA
# import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity


class RecognizeFace:
    def __init__(self):
        self.data = []

        pass
    
    """
    Process each image in directory and add to the training dataset
    folder_path - Path of the folder where the images are located
    """
    def process_imgs(self, folder_path: str) -> List[np.array]:
        for file_name in os.listdir(folder_path):
            dir = os.path.join(folder_path, file_name)
            image = cv.imread(dir)
            resized_image = cv.resize(image, (128, 128))
            gray_image = cv.cvtColor(resized_image, cv.COLOR_BGR2GRAY)
            self.data.append(np.array(gray_image.flatten()))

        return np.array(self.data)


    

# face = RecognizeFace()
# result = face.process_imgs('dataset')
# pca = PCA(n_components=20)
# reduced_data = pca.fit_transform(result)

# for i in range(5):  # Display first 5 eigenfaces
#     plt.imshow(pca.components_[i].reshape(128, 128), cmap='gray')
#     plt.title(f"Eigenface {i+1}")
#     plt.show()

# Compare a new image's embedding to the stored identification data
# img = cv.imread('headshot.jpg')
# gray_image = cv.cvtColor(img, cv.COLOR_BGR2GRAY) 
# new_image = cv.resize(gray_image, (128, 128))

# new_image_embedding = pca.transform(new_image.flatten().reshape(1, -1))  # Project new image
# similarities = cosine_similarity(new_image_embedding, reduced_data)

# # Find the closest match
# best_match_index = np.argmax(similarities)
# confidence_score = similarities[0, best_match_index]

# if confidence_score > 0.95:  # Threshold for confidence
#     print(f"Identified as person {best_match_index} with confidence {confidence_score}")
# else:
#     print("Face not recognized.")


# print(result)
