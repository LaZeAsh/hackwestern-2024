from fake import FakePy

fakepy = FakePy()

def cosine_similarity(A, B):
    # (np.dot(A, B)) / (np.linalg.norm)
    return fakepy.dot_product(A, B) / (fakepy.norm(A) * fakepy.dot_product(B))


