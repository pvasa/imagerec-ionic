/**
 * Copyright 2017 Priyank Vasa
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public base64Image: string;

  constructor(private http: HTTP, public navCtrl: NavController) {}

  recognize = function(imageBase64: string) {

    let mHeaders = new Headers();
    mHeaders.append('Accept', 'application/json');
    mHeaders.append('Content-Type', 'application/json');
 
    let data = {
          "requests": [
            {
              "image": {
                "content": imageBase64
              },
              "features": [
                {
                  "type": "TYPE_UNSPECIFIED",
                  "maxResults": 1
                }
              ]
            }
          ]
        }
    
    this.http.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDD8obfnIEeM0P-LSgIfd9Zd6W_CMC0-PE", data, { headers: mHeaders })
      .then(data => {
        console.log(data['_body']);
       })
      .catch(error => {
        console.log(error);// Error getting the data
      });
  }

  takePicture = function() {

    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 768,
        targetHeight: 1024,
        correctOrientation: true,
        cameraDirection: 0,
        encodingType: Camera.EncodingType.JPEG
    }).then((imageData) => {

        this.base64Image = "data:image/jpeg;base64," + imageData;

        this.recognize(this.base64Image);

    }, (err) => {
        console.log(err);
    });
  }

}
