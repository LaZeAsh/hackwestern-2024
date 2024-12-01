"""
This file is dedicated to my commitment to not use numpy for this project
"""
import math

class FakePy:
    def __init__(self):
        pass

    """
    Finds the dot product of 2 vectors with the same dimensions

    a0b0 + a1b1 + a2b2 + ... anbn
    """
    def dot_product(A, B):
        if len(A) != len(B):
            raise ValueError("Vectors A and B must be the same length")
        sum = 0
        for i in range(len(A)):
            sum += A[i] * B[i]
        
        return sum

    """
    Finds the norm of the vector

    sqrt(a0^2 + a1^2 ... an^2)
    """
    def norm(A):
        sum = 0
        for i in range(len(A)):
            sum += A[i] ** 2

        return math.sqrt(sum)
    

        