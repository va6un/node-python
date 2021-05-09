import matplotlib.pyplot as pyplot
from PIL import Image
import numpy as np

house = Image.open('house.jpg')
house_array = np.asarray(house)
print(house_array.shape)
print(house_array)

