import React from 'react'
import Layout from '../components/Layout'
import 'isomorphic-fetch';
import { Link, navigate } from 'gatsby'

class IndexPageTemplate extends React.Component {

  constructor() {
    super();
    this.state = {
      videos: [],
      table: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillMount(){
    // Refactor for aws lambda
    // fetch("/.netlify/functions/api/?path=/api/globalstats")
    // .then(response => response.json())
    // .then(data => {
    //   this.setState({table: data});
    // })

    // fetch("/.netlify/functions/api/?path=/api/bestinsho")
    // .then(response => response.json())
    // .then(data => {
    //   this.setState({videos: data});
    // })

    this.setState({table:{
      "videos": 2067,
      "views": 1025,
      "comments": 10,
      "creators": 104,
      "likes": 1,
      "createdAt": "2019-04-02T07:37:54.737Z"
    }});

    this.setState(
      {videos:[
      {
        "shortId": "95W",
        "duration": 122,
        "title": null,
        "applicationName": "videoscribe",
        "applicationDisplayName": "VideoScribe",
        "ownerId": 5003652,
        "ownerName": "Test Account",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2019/1/28/4dd920bda7c74929af2a4750c24f93a3/5_640x360.jpg"
      },
      {
        "shortId": "830",
        "duration": 21,
        "title": null,
        "applicationName": "storypix",
        "applicationDisplayName": "StoryPix",
        "ownerId": 5000003,
        "ownerName": "Joe Clarke",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/854dc779f4c9476f8ff15365a40d0b7e/640x360.jpg"
      },
      {
        "shortId": "82T",
        "duration": 30,
        "title": null,
        "applicationName": "storypix",
        "applicationDisplayName": "StoryPix",
        "ownerId": 5000003,
        "ownerName": "Joe Clarke",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/c8ddafa13db54ff89042cc3ac7b35b10/640x360.jpg"
      },
      {
        "shortId": "82Z",
        "duration": 39,
        "title": null,
        "applicationName": "storypix",
        "applicationDisplayName": "StoryPix",
        "ownerId": 5000003,
        "ownerName": "Joe Clarke",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/11/12f9ee90004246abb1596abe9ae21c3b/640x360.jpg"
      },
      {
        "shortId": "7XB",
        "duration": 20,
        "title": null,
        "applicationName": "storypix",
        "applicationDisplayName": "StoryPix",
        "ownerId": 5000670,
        "ownerName": "Matthew Williams",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/12/287228cac56e42e4b06accdeb98c9c99/640x360.jpg"
      },
      {
        "shortId": "8BJ",
        "duration": 3,
        "title": "New Fade Feature",
        "applicationName": "videoscribe",
        "applicationDisplayName": "VideoScribe",
        "ownerId": 5000453,
        "ownerName": "Darren Farrington",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/3/5/cdde8725eba9406784568e40e6a00cae/5_640x360.jpg"
      },
      {
        "shortId": "8VE",
        "duration": 5,
        "title": null,
        "applicationName": "videoscribe-cloud",
        "applicationDisplayName": "FunScribe",
        "ownerId": 5000003,
        "ownerName": "Joe Clarke",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/11/9/ecb8f2b0e41511e8ad5f1118eaeefb23/640x360.jpg"
      },
      {
        "shortId": "87L",
        "duration": 5,
        "title": null,
        "applicationName": "storypix",
        "applicationDisplayName": "StoryPix",
        "ownerId": 5000670,
        "ownerName": "Matthew Williams",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2018/1/19/c4c7d29644e94203bd2cc71bb618fb55/640x360.jpg"
      },
      {
        "shortId": "7YF",
        "duration": 15,
        "title": null,
        "applicationName": "storypix",
        "applicationDisplayName": "StoryPix",
        "ownerId": 5000887,
        "ownerName": "Lou Hayward",
        "thumbnails": {
          "first": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/160x100.png"
            }
          },
          "representative": {
            "jpeg": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1920x1080.jpg",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1280x720.jpg",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/640x360.jpg",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/320x240.jpg",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/160x100.jpg"
            },
            "png": {
              "1920x1080": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1920x1080.png",
              "1280x720": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/1280x720.png",
              "640x360": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/640x360.png",
              "320x240": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/320x240.png",
              "160x100": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/160x100.png"
            }
          }
        },
        "videoThumbnailURL": "https://d3jvcii8ih1s66.cloudfront.net/publish/2017/12/15/b6916d84ed694e518ab2608b751ea8c9/640x360.jpg"
      }
    ]
      });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
 }

  keyPress(e){

      if(e.keyCode === 13){

        navigate(`/${e.target.value}`);
        
      }
  }

  render() {
    let videos = this.state.videos;
    let table = this.state.table;
    
    return (
      <div>
        <div className="intro">
          <div className="container text-center">
            <img src="https://sho.co/assets/images/engagement_wheel.png" alt="Sho.co engagment wheel" className="img-padding img-responsive">
            </img>
            <h1 className="jumbo">Share your Sparkol videos</h1>
          </div>
          <span className="icwrap2">
            <span className="ic3"></span>
            <span className="ic2"></span>
            <span className="ic1"></span>
          </span>
        </div>
    
        <div className="search">
          <div className="container text-center">
            <h1 className="jumbo text-padding">Find a video</h1>
            <form className="search-box">
                <label className="search-label">sho.co/</label>
                <input className="search-input" type="text" placeholder="shortcode" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange}>
                </input>
            </form>      
          </div>

          <span className="icwrap3">
            <span className="ic1"></span>
            <span className="ic2"></span>
            <span className="ic3"></span>
          </span>
        </div>
    
        <div className="videos">
          <div className="text-center">
            <ul className="container stats-table">
              <li>{table.videos}
                <span className="stat-font">
                  Videos
                </span>
              </li>
              <li>{table.views}
                <span className="stat-font">
                  Views
                </span>
              </li>
              <li>{table.comments}
                <span className="stat-font">
                  Comments
                </span>
              </li>
              <li>{table.creators}
                <span className="stat-font">
                  Creators
                </span>
              </li>
              <li className="last">{table.likes}
                <span className="stat-font">
                  Likes
                </span>
              </li>
            </ul>
          </div>
          
          
          <div className="container text-center">
            <h1 className="jumbo text-padding">Best in sho</h1>        
          </div>
          
          <ul className="video-links">
            {
              videos.map((video, i) => 
                <li key={video.shortId}>
                  <div className="video-thumb">
                    <Link to={'/'+video.shortId}>
                      <img src={video.videoThumbnailURL} alt={video.title}/>
                    </Link>
                      <span className="video-length">{video.duration}</span>
                        <div className="video-info">              
                          <span className="video-owner">Created with 
                          <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                    by <Link to={"/user/"+video.ownerId || ''}> {video.ownerName || ''} </Link>
                          </span>
                        </div>
                  </div>
                </li>
              )
            }
          </ul>
    
          <span className="icwrap4">
            <span className="ic1"></span>
            <span className="ic2"></span>
            <span className="ic3"></span>
          </span>
        </div>
      </div>
    )
  }
}

const IndexPage = () => {

  return (
    <Layout>
      <IndexPageTemplate/>
    </Layout>
  )
}

export default IndexPage
