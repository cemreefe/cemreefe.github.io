## Generating Images from Sketches using SketchyGAN

@ coding, deep learning, computer vision

In this project, we implemented SketchyGAN, an image-to-image GAN model that allowed for non-pixel-to-pixel transformations which was novel at the time. We followed the SketchyGAN paper and implemented the model in Keras instead of TensorFlow as the paper did.

Read about our project from inzva:

>Having graduated from the “junior position” they were assigned to in the previous batch of AI Projects, undergraduates from Boğaziçi University, Cemre Efe Karakaş and Eylül Yalçınkaya, along with another undergraduate from Istanbul Technical University, Burak Bekçi, a previous participant in our Applied AI Study Group, had one of the most acclaimed presentations in AI Projects history as they showcased a very fun way to implement GANs by turning their faces into sketches. 
>
>![](https://images.squarespace-cdn.com/content/v1/58a59506414fb5112de476f0/1574107592980-68XHGMJJR6ETRH1XBPEG/ai-projects-3-team3.png)
>
>The purpose of this project was to convert a sketch image into an actual image. A GAN architecture is used since this is an image-to-image translation problem. The team first wanted to replicate the results of their reference paper, SketchyGAN [1]. This special GAN architecture contains the masked residual unit (MRU) as a novel component. Apart from the traditional convolutions and the features obtained from them, MRU layer takes downsampled and upsampled versions of the actual images as input during the encoding and decoding part in the generator. Apart from this novel architecture, SketchyGAN also use extra loss terms added to the original GAN loss, such as perceptual loss and diversity loss. The team showed their results by also presenting their own sketches translated into actual images. 
>
> _[https://inzva.com/reports/2019/ai-projects-3](https://inzva.com/reports/2019/ai-projects-3)_

- See our [presentation](https://drive.google.com/file/d/12D3hoo-K_FLac9T6r33zNmhVBxDl2SvU/view?usp=sharing) for more details.
- See our [GitHub repo](https://github.com/inzva/sketch-to-photograph-with-GANs) for the implementation.


