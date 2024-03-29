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
            var token = this.getToken();
            m.request({
                method: "POST",
                url: "albums",
                data: {"name": data.name, "token": token}
            }).then(callback);
            Buffer.clear();
        },
        removeAlbum: function (album, callback) {
            var token = this.getToken();
            m.request({
                method: "DELETE",
                url: album.url + "/" + album._id,
                data: {"token": token}
            }).then(callback);
            Buffer.clear();
        },
        updateAlbum: function (data, album, callback) {
            var token = this.getToken();
            m.request({
                method: "PUT",
                url: album.url + "/" + album._id,
                data: {"token": token, name: data.name}
            }).then(callback);
            Buffer.clear();
        },
        getPictures: function (idAlbum, callback) {
            var url =   "albums/" + idAlbum + "/pictures";
            Buffer.getRessource(url, callback);
        },
        addPicture: function (data, albumId, callback) {
            var token = this.getToken();
            m.request({
                method: "POST",
                url: "albums/" + albumId + "/pictures",
                data: {"name": data.name, "base64": data.base64, "extension": data.extension, "token": token}
            }).then(callback);
            Buffer.clear();
        },
        removePicture: function (picture, callback) {
            var token = this.getToken();
            m.request({
                method: "DELETE",
                url: picture.url + "/" + picture._id,
                data: {"token": token}
            }).then(callback);
            Buffer.clear();
        },
        updatePicture: function (data, picture, callback) {
            var token = this.getToken();
            m.request({
                method: "PUT",
                url: picture.url + "/" + picture._id,
                data: {"token": token, name: data.name, "base64": data.base64, "extension": data.extension}
            }).then(callback);
            Buffer.clear();
        },
        getCover: function (cover, callback) {
            var url = cover.href;
            Buffer.getRessource(url, callback);
        },
        addCover: function (data, albumId, callback) {
            var token = this.getToken();
            m.request({
                method: "POST",
                url: "albums/" + albumId + "/covers",
                data: {"name": data.name, "base64": data.base64, "extension": data.extension, "token": token}
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
            var token = this.getToken();
            m.request({
                method: "POST",
                url: "events",
                data: {"title": data.title, "dates": data.dates, "description": data.description, "token": token}
            }).then(callback);
            Buffer.clear();
        },
        removeEvent: function (event, callback) {
            var token = this.getToken();
            m.request({
                method: "DELETE",
                url: event.url + "/" + event._id,
                data: {"token": token}
            }).then(callback);
            Buffer.clear();
        },
        updateEvent: function (data, event, callback) {
            var token = this.getToken();
            m.request({
                method: "PUT",
                url: event.url + "/" + event._id,
                data: {"token": token, title: data.title, "dates": data.dates, "description": data.description}
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
            var token = this.getToken();
            m.request({
                method: "POST",
                url: "biography",
                data: {"content": data.content, "token": token}
            }).then(callback);
            Buffer.clear();
        },
        authenticate : function (data, callback) {
            m.request({
                method: "POST",
                url: "/authenticate",
                data: {"name": data.login, "password": data.password}
            }).then(callback);
        },
        getToken: function() {
            return sessionStorage.getItem('token');
        },
        removeToken: function() {
            sessionStorage.removeItem('token');
        },
        getSite: function(callback) {
            var url = "site";
            m.request({
                method: "GET",
                url: url
            }).then(callback);
        },
        updateSite: function(data, callback) {
            var url     = "site";
            var token   = this.getToken();
            console.log(data);
            m.request({
                method: "PUT",
                url: url,
                data: {
                    "token": token,
                    "background": data.background,
                    "title": data.title,
                    "biographyLabel": data.biographyLabel,
                    "picturesLabel": data.picturesLabel,
                    "eventsLabel": data.eventsLabel,
                    "backgroundColor": data.backgroundColor
                }
            }).then(callback);
            Buffer.clear();
        }
    };

    return Model;
});
