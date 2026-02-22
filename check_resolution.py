import cv2
import glob
import os

files = glob.glob('assests/ezgif-295c0ba92881b527-jpg/*.jpg')
if files:
    img = cv2.imread(files[0])
    print(f"Resolution: {img.shape[1]}x{img.shape[0]}")
else:
    print("No images found")
