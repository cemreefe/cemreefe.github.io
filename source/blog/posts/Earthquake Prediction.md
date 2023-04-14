## Trigger Word Detection for Earthquake Prediction

A trigger word detection model detects specific words or phrases such as 'Hey Siri!' in audio. The model listens to audio continuously and when the waveform suggests that the last waves might have been formed by the trigger word, the model outputs a higher value.

In this project, we explored the effectiveness of Andrew Ng's trigger-word-detection model for predicting earthquakes. We applied the same logic to see if preceding waves provide information about the time to failure.

However, it turned out that this model was not the best fit for this particular problem. Despite this, we learned a great deal during the process, particularly because this was our first deep learning project and we worked with a large dataset of around 610 million points.

Check out our implementation in [this Kaggle notebook](https://github.com/inzva/earthquake-prediction-kaggle).
