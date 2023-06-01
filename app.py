from flask import Flask, render_template, request
from PIL import Image
import requests
from io import BytesIO
import re

app = Flask(__name__)

ASCII_CHARS = '@%#*+=-:. '

def resize_image(image, new_width=100, new_height=None):
    width, height = image.size
    if new_height is None:
        ratio = height / width / 1.65
        new_height = int(new_width * ratio)
    resized_image = image.resize((new_width, new_height))
    return resized_image

def grayscale(image):
    return image.convert('L')

def pixels_to_ascii(image):
    pixels = image.getdata()
    ascii_str = ''
    for pixel_value in pixels:
        brightness = pixel_value
        ascii_str += ASCII_CHARS[brightness // 32]
    return ascii_str

def convert_image_to_ascii(image_path, new_width=100, replace_chars=''):
    try:
        image = Image.open(image_path)
    except Exception as e:
        print(e)
        return None

    image = resize_image(image, new_width=new_width)
    image = grayscale(image)

    ascii_str = pixels_to_ascii(image)

    if replace_chars:
        replaced_str = re.sub(replace_chars, ' ', ascii_str)
        ascii_str = replaced_str

    img_width = image.width
    ascii_str_len = len(ascii_str)
    ascii_img = ''

    for i in range(0, ascii_str_len, img_width):
        ascii_img += ascii_str[i:i+img_width] + '\n'

    return ascii_img

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def convert():
    file = request.files.get('file')
    image_url = request.form.get('image_url')
    replace_chars = request.form.get('hidden_chars')

    if file:
        img = file.read()
        with open('temp.jpg', 'wb') as f:
            f.write(img)
        size = int(request.form.get('size', 100))
        ascii_img = convert_image_to_ascii('temp.jpg', new_width=size, replace_chars=replace_chars)
        return render_template('index.html', ascii_img=ascii_img)
    
    elif image_url:
        # New code to download and convert image from URL
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))
        size = int(request.form.get('size', 100))
        image.save('temp.jpg')  # Save the downloaded image
        ascii_img = convert_image_to_ascii('temp.jpg', new_width=size, replace_chars=replace_chars)
        return render_template('index.html', ascii_img=ascii_img)
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

