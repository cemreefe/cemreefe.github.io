## Earthquake time-to-failure prediction using a trigger word detection algorithm

! emoji 🌍
@ coding, machine learning, deep learning

In this project, we aimed to explore the feasibility of using trigger word detection models to predict earthquakes. We were fortunate to have the guidance and expertise of a senior engineer from Is Bankasi, who provided valuable insights and guidance throughout the project. This project was part of Inzva's Applied AI Projects, which aims to give hands-on experience to aspiring data scientists and machine learning engineers.

To accomplish our goal, we used Andrew Ng's trigger word detection model, which is a widely used approach in the field of natural language processing. We adapted this model to listen to audio recordings of seismic activity continuously and output a higher value when the waveform suggests that the last waves might have been formed by the trigger word. Our hypothesis was that the preceding waves in the recording could provide information about the time to failure, allowing us to predict an earthquake.

We were excited to participate in a Kaggle competition where we applied our model to predict the timing of earthquakes based on seismic activity. The competition was a challenge, as we were working with a large dataset of around 610 million points, making data processing and training time-consuming. Despite these challenges, our team was able to place in the top 11% of participants, which was a great achievement for our first deep learning project.

![](/static/img/projects/earthquake_ttf.png)

Throughout this project, we learned a great deal about the complexities of working with real-world data and the challenges of adapting models to different domains. While we ultimately determined that the trigger word detection model was not the best fit for predicting earthquakes, we gained valuable experience and insights that will serve us well in future projects. We hope that our efforts will contribute to ongoing research in earthquake prediction and inspire other data scientists and machine learning engineers to tackle challenging problems in the field of earth science.

Check out our implementation in [this Kaggle notebook](https://github.com/inzva/earthquake-prediction-kaggle).
