define(["mithril"], function (m) {
    'use strict';

    var Buffer = {
        getRessource : function (url, callback) {
            var data = sessionStorage.getItem(url);
            // Temporary disable cache because of unanticipated comportement
            if (false) {
                callback(JSON.parse(data));
            } else {
                m.request({method: "GET", url: url, background: true})
                    .then(function (data) {
                        sessionStorage.setItem(url, JSON.stringify(data));
                        callback(data);
                    }, function (err) {
                        console.log(err);
                    });
            }
        },
        clear : function () {
            var i = sessionStorage.length;
            var key = null;
            while (i  > 0) {
                key = sessionStorage.key(i);
                if (!/token/.test(key)) {
                    sessionStorage.removeItem(key);
                }
                i -= 1;
            }
        }
    };

    var Model = {
        getAlbums: function (callback) {
            var url = "albums";
            Buffer.getRessource(url, callback);
        },
        getAlbum: function (albumId, callback) {
            var url =  "albums/" + albumId;
            Buffer.getRessource(url, callback);
        },
        addAlbum: function (data, callback) {
            m.request({
                method: "POST",
                url: "albums",
                data: {"name": data.name, "token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        removeAlbum: function (album, callback) {
            m.request({
                method: "DELETE",
                url: album.url + "/" + album._id,
                data: {"token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        updateAlbum: function (data, album, callback) {
            m.request({
                method: "PUT",
                url: album.url + "/" + album._id,
                data: {"token": sessionStorage.getItem('token'), name: data.name}
            }).then(callback);
            Buffer.clear();
        },
        getPictures: function (idAlbum, callback) {
            var url =   "albums/" + idAlbum + "/pictures";
            Buffer.getRessource(url, callback);
        },
        addPicture: function (data, albumId, callback) {
            m.request({
                method: "POST",
                url: "albums/" + albumId + "/pictures",
                data: {"name": data.name, "base64": data.base64, "extension": data.extension, "token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        removePicture: function (picture, callback) {
            m.request({
                method: "DELETE",
                url: picture.url + "/" + picture._id,
                data: {"token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        updatePicture: function (data, picture, callback) {
            m.request({
                method: "PUT",
                url: picture.url + "/" + picture._id,
                data: {"token": sessionStorage.getItem('token'), name: data.name}
            }).then(callback);
            Buffer.clear();
        },
        getCover: function (cover, callback) {
            var url = cover.href;
            Buffer.getRessource(url, callback);
        },
        addCover: function (data, albumId, callback) {
            m.request({
                method: "POST",
                url: "albums/" + albumId + "/covers",
                data: {"name": data.name, "base64": data.base64, "extension": data.extension, "token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        getEvents: function (callback) {
            var url = "events";
            Buffer.getRessource(url, callback);
        },
        getEvent: function (eventId, callback) {
            var url =  "events/" + eventId;
            Buffer.getRessource(url, callback);
        },
        addEvent: function (data, callback) {
            m.request({
                method: "POST",
                url: "events",
                data: {"title": data.title, "dates": data.dates, "description": data.description, "token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        removeEvent: function (event, callback) {
            m.request({
                method: "DELETE",
                url: event.url + "/" + event._id,
                data: {"token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        updateEvent: function (data, event, callback) {
            m.request({
                method: "PUT",
                url: event.url + "/" + event._id,
                data: {"token": sessionStorage.getItem('token'), title: data.title, "dates": data.dates}
            }).then(callback);
            Buffer.clear();
        },
        getBiography: function (callback) {
            var url = "biography";
            m.request({method: "GET", url: url})
                .then(function (data) {
                    callback(data);
                }, function (err) {
                    console.log(err);
                });
        },
        addBiography: function (data, callback) {
            m.request({
                method: "POST",
                url: "biography",
                data: {"content": data.content, "token": sessionStorage.getItem('token')}
            }).then(callback);
            Buffer.clear();
        },
        authenticate : function (data, callback) {
            // implementation of request need to be moved in a service
            // outside of this component
            m.request({
                method: "POST",
                url: "/authenticate",
                data: {"name": data.login, "password": data.password}
            }).then(callback);
        }
    };

    return Model;
});
