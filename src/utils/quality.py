import cv2
import magic
from PIL import Image

def verify_true_format(file_path):
    try:
        mime_detector = magic.Magic(mime=True)
        return mime_detector.from_file(file_path)
    except Exception as e:
        return f"Error: {str(e^)}"

def analyze_dimensions(file_path):
    with Image.open(file_path) as img:
        return img.size

def calculate_blur_score(file_path):
    image = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
    if image is None:
        raise FileNotFoundError(f"Could not load image at {file_path}")
    return round(cv2.Laplacian(image, cv2.CV_64F).var(), 2)
