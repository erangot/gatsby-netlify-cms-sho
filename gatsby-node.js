const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const fetch = require("node-fetch")
const http = require('http');

let options = {
  host : 'localhost',
  port : 6970,
  path:  "/api/bestinsho",
  headers: {
      "Authorization": "Basic Y29saW46cGFzc3dvcmQ="
      },
};

let mockVideos = [
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
];

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        // tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    });

    // Get all videos
    mockVideos.forEach(video => {
          createPage({
            path: `/${video.shortId}`,
            component: path.resolve(
              `src/templates/video-page.js`
            ),
            context: {
              video,
            },
          })
        });

    // http.get(options, function(res) {
    //   let body1 = '';
    //   console.log("Got response: " + res.statusCode);
    //   res.on('data', (chunk) => body1 += chunk);
    //   res.on('end', () => {
    //   console.log('Successfully processed HTTPS response');
    //   console.log('Video to create: '+ body1.length);
    //   let allvideos = body1;
    //   console.log('test: '+body1[body1.length/2])
    //   for (let index = 0; index < 9; index++) {
    //     const element = allvideos[index];
    //     console.log(element.shortId)
    //   }
    // })
    // }).on('error', function(e) {
    //   console.log("Got error: " + e.message);
    // });
    
    // let allvideos = await getAllVideos()
    // http.get(options, function(res) {
    //   let body1 = '';
    //   console.log("Got response: " + res.statusCode);
    //   res.on('data', (chunk) => body1 += chunk);
    //   res.on('end', () => {
    //     console.log('Successfully processed HTTPS response');
        // If we know it's JSON, parse it
        // if (res.headers['content-type'] === 'application/json') {
        //     body1 = JSON.parse(body1);
        // }
        // resolve(body1);
        // console.log('Video to create: '+ body1.length);
        // let allvideos = body1;
        // console.log('test: '+body1[body1.length/2])
        // for (let index = 0; index < 9; index++) {
        //   const element = allvideos[index];
        //   console.log(element.shortId)
          // createPage({
          //   path: `/${element.shortId}`,
          //   component: path.resolve(
          //     `src/templates/video-page.js`
          //   ),
          //   context: {
          //     element,
          //   },
          // })
        // }
        // allvideos.forEach(video => {
        //   createPage({
        //     path: `/${video.shortId}`,
        //     component: path.resolve(
        //       `src/templates/video-page.js`
        //     ),
        //     context: {
        //       video,
        //     },
        //   })
        // });

      // })
      // context.succeed();
    // }).on('error', function(e) {
    //   console.log("Got error: " + e.message);
      // resolve(null);
    // });
    
    // Create page for each video


    // Tag pages:
    // let tags = []
    // Iterate through each post, putting all found tags into `tags`
    // posts.forEach(edge => {
    //   if (_.get(edge, `node.frontmatter.tags`)) {
    //     tags = tags.concat(edge.node.frontmatter.tags)
    //   }
    // })
    // Eliminate duplicate tags
    // tags = _.uniq(tags)

    // Make tag pages
    // tags.forEach(tag => {
    //   const tagPath = `/tags/${_.kebabCase(tag)}/`

    //   createPage({
    //     path: tagPath,
    //     component: path.resolve(`src/templates/tags.js`),
    //     context: {
    //       tag,
    //     },
    //   })
    // })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
