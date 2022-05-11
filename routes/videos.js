const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const getVideos = () => {
    const videos = fs.readFileSync('./data/videos.json');
    return JSON.parse(videos);
}

const saveVideos = (updatedVideos) => {
    fs.writeFileSync('./data/videos.json', JSON.stringify(updatedVideos))
}


router.route("/")
    .get((_req, res) => {

        let formattedVideos = getVideos()
            .map(video => {
                return {
                    "channel": video.channel,
                    "id": video.id,
                    "image": video.image,
                    "title": video.title,
                }
            })

        res.status(200).json(formattedVideos)
    })

    .post((req, res) => {
        const newVideo = {
            id: uuidv4(),
            title: req.body.title,
            channel: 'Ted Lasso',
            image: req.body.image,
            description: req.body.description,
            views: "0",
            likes: "0",
            duration: "5:00",
            video: "",
            timestamp: Date.now(),
            comments: [],
        }

        let updatedVideos = getVideos();
        updatedVideos.push(newVideo);

        saveVideos(updatedVideos);

        res.status(201).send({
            "id": newVideo.id,
            "status": "successful"
        })
    })


router.get('/:id', (req, res) => {
    const individualVideo = getVideos().find(video => video.id === req.params.id)

    if (!individualVideo) {
        res.status(404).json({
            message: ("Video not found")
        })
        return;
    }

    res.status(201).json(individualVideo)
})

module.exports = router;