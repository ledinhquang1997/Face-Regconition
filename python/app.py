from mimetypes import init

from flask import Flask, render_template, request, jsonify;
from scipy.misc import imsave, imread, imresize;
import numpy as np;
import keras.models;
import re;
import sys;
import os;
import io

from keras.models import load_model
from tensorflow.python.ops.image_ops_impl import convert_image_dtype
from PIL import Image
from flask_cors import CORS
import base64
from io import BytesIO, StringIO

import tensorflow as tf

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# sys.path.append(os.path.abspath("./Model/FACE_COLOR_MODEL_VERSION_4"));


app = Flask(__name__)
CORS(app)

PATH = os.getcwd()

global model
labels_name = ['admars', 'ahodki', 'ajflem', 'ajones', 'ajsega',
               'akatsi', 'ambarw', 'anpage', 'asamma', 'asewil',
               'asheal', 'astefa', 'bplyce', 'cchris', 'ccjame',
               'cferdo', 'cgboyc', 'chaeyoung', 'chipu', 'christian',
               'cjcarr', 'cjdenn', 'cjsake', 'cmkirk', 'csanch',
               'cshubb', 'cwang', 'cwchoi', 'dagran', 'dakram',
               'daniels', 'dcbowe', 'dioann', 'djbirc', 'djhugh',
               'djmart', 'dmwest', 'doraj', 'drbost', 'ekavaz',
               'elduns', 'fordj', 'gdhatc', 'ggeorg', 'ggrego',
               'gjhero', 'gjnorm', 'gmwate', 'godfather', 'gpapaz',
               'gpsmit', 'gsreas', 'hartb', 'hensm', 'hymanroth',
               'ieorf', 'irdrew', 'jabins', 'jagrif', 'jcarte',
               'jdbenm', 'jennie', 'jgloma', 'jiggle', 'jisoo',
               'jlemon', 'jmedin', 'johncena', 'johnnydeep', 'jrtobi',
               'kaatki', 'kaknig', 'kdjone', 'khchan', 'khughe',
               'kingmax', 'kingston', 'kjwith', 'klclar', 'ksunth',
               'lejnno', 'lfso', 'lisa', 'lyond', 'maasht',
               'macci', 'martin', 'mberdo', 'mbutle', 'mdpove',
               'mefait', 'mhwill', 'miaduc', 'michael', 'mjhans',
               'moors', 'mpetti', 'muthay', 'nahaig', 'namull',
               'ndbank', 'ndhagu', 'nhrams', 'njmoor' , 'npbour',
               'npmitc', 'nrclar', 'nrrbar', 'nwilli' , 'obeidn',
               'ohpark', 'pacole', 'phughe', 'pmives' , 'pshurr',
               'pspliu', 'ptnich', 'rarobi', 'reypark', 'rgharr',
               'rgspru', 'rjlabr', 'rlocke', 'rmcoll' , 'rmpugh',
               'rnpwil', 'robin', 'rrowle' , 'rsanti' , 'saduah',
               'saedwa', 'sandm' , 'sbains', 'sidick' , 'sjbeck',
               'skumar', 'slbirc', 'smrobb', 'spacl'  , 'spletc',
               'svkriz', 'swewin', 'swsmit', 'tony'   , 'tripleh',
               'undertaker', 'voudcx' , 'vpsavo' , 'vstros', 'whussa', 'wjalbe', 'yfhsie']


# # if this is the main thread of execution first load the model and then start the server
# if __name__ == "__main__":
#     print(("* Loading Keras model and Flask starting server..."
#            "please wait until server has fully started"))
#     app.run(threaded=True)

def convertImage(imgData1):
    imgstr = re.search(r'base64,(.*)', imgData1).group(1)
    # print(imgstr)
    with open('output.png', 'wb') as output:
        output.write(imgstr.decode('base64'))


def printme(test_img):
    # test_img = Image.open(PATH + '/DATASET/DATASET_COLOR/REDUCED/TEST_10/0.jpg')
    test_img = test_img.resize((128, 128))
    test_img_2darr = np.array(test_img)
    test_img_2darr = test_img_2darr.reshape(1, 128, 128, 3)
    print(test_img_2darr);
    y_pred = model.predict(test_img_2darr)
    count = 0;
    for num in y_pred[0]:
        if num == 1:
            break
        count += 1

    return labels_name[count]


@app.route("/quang")
def index():
    return jsonify(result={"fucking_name": printme()})


@app.route('/predict', methods=["POST"])
def predict():
    imgData = request.get_data();
    print(type(imgData))
    image = Image.open(io.BytesIO(imgData))
    # i = Image.open(StringIO(imgData))
    # imgData = re.sub('^data:image/.+;base64,', '', request.get_data())
    # im = Image.open(BytesIO(base64.b64decode(imgData)))
    # x = imread('output.png', mode='L')
    # x = np.invert(x)
    # x = imresize(x, (128, 128))
    # x = x.reshape(1, 128, 128, 3)
    # print(x);
    return jsonify(result={"name": printme(image)})
    # return jsonify(result={"fucking_name": "cena"})


if __name__ == '__main__':
    print("Not Yet")
    model = load_model('Model/final.h5')

    print("Already")
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, threaded=False)
