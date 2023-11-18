# Mask detection using CV2 and a custom ML model trained from scratch

! emoji 😷
@ deep learning, hobbydev, coding

### Situation

People started wearing masks in Istanbul during the coronavirus outbreak. After I realized this, I wanted to know what percentage of people were wearing masks and since I had all the time in the world due to schools getting cancelled, I took on this personal project.

![](/static/img/projects/mask_data.png){width=85%}

I used OpenCV to detect people in a video stream provided by İBB (the metropolitan municipality of Istanbul). I saved the people detected in the last minute and when new detections arrived, I compared them with the saved images to avoid duplicates.

### Shortcomings

This was the beginning of Covid-19. So there weren't any models trained to locate/classify surgical masks. 

### Solution: DIY

After collecting around 10,000 images, I needed to label them to train my mask detection model. So I wrote a simple GUI annotation tool to label images and save their labels into text files in csv format.

I normalized the data for training by upsampling the number of masked individuals to speed up the learning at the beginning and slowly decreased the magnitude of normalization until I reached the point where I was training with the original dataset.

I wrote a simple script that parses all images from their paths (seperated by dates), predicts labels for all of them and plotting the change in the percentage of masked people in the population.

![](/static/img/projects/mask_gui.png){width=60%}

The project, although time-consuming, was a lot of fun and it has helped me gain a good amount of hands-on practice. I am also quite happy with the data I was able to get from this project.

See my [github repo](https://github.com/cemreefe/are-you-wearing-your-mask) for the implementation.

! include socials
