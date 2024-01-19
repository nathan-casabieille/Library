import os
from flask import jsonify
from werkzeug.utils import secure_filename
from flask import request, send_from_directory, Blueprint

import logging

uploadRoute = Blueprint('uploadRoute', __name__)

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(file_name):
    return '.' in file_name and file_name.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@uploadRoute.route('/upload', methods=['POST'])
def fileUpload():
    folder_name = request.form.get('folder_name', 'documents')
    target=os.path.join(UPLOAD_FOLDER, folder_name)
    if not os.path.isdir(target):
        os.makedirs(target)
    file = request.files['file'] 
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    if file and allowed_file(file.filename):
        custom_file_name = request.form.get('file_name', file.filename)
        file_name = secure_filename(custom_file_name)
        file_path = os.path.join(target, file_name)
        file.save(file_path)
        logging.info(file_path)
        return jsonify({'file_name': file_name}), 200
    return jsonify({'error': 'Allowed file types are png, jpg, jpeg, gif'}), 400
    
@uploadRoute.route('/uploads/<path:file_name>')
def download_file(file_name):
    return send_from_directory(UPLOAD_FOLDER, file_name)