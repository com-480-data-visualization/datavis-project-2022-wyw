# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Bohan Wang | 321293 |
| Xinghai Wang| 323569 |
| Yingxue Yu| 324788 | 

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 

### Dataset

The dataset we choose to use is Best Artworks of All Time, which can be found in https://www.kaggle.com/datasets/ikarus777/best-artworks-of-all-time. The dataset collect artworks of the 50 most influential painters of all time, and associated with basic information retrieved from wikipedia. In detail, this collection contains 3 files:
* artists.csv: A file contains basic information of the 50 most famous painter, including their names, years, gendres, nationnalities, bios, wikipedia links and paintings
* images.zip: A file contains all paintings of each artists. All images are full size and divided in corresponding folders and sequentially numbered
* resized.zip: Same work with images.zip but images have been resized and extracted from folder structure. Images in this file have smaller size which allow us to process model faster

Considering the preprocessing, the image.zip and resized.zip are colllections of images, only the artists.csv has one name garbled, all of them are very clean and don't need much preprocessing. 


### Problematic

Painting is an important form in the visual arts, it can be used to communicate ideas, create a sense of beauty, explore the nature of perception, or express strong emotions. By appreciating painting, we can enrich our spirituality, acquire knowledge and inspiration, discover a vivid history and so on. In conclusion, appreciating painting can be very helpful. However, many person are layman of art and don't know how to start the artistic journey. The motivation of this project is to give them basic knowledge of analyzing the artist and their work by exploring the implicit data inside the pictures.

The main axis we want to develop are stated as following:
* Recognizing the correct artist of paintings: By analyzing the colors used and the geometric patterns inside the pictures, we want to indentify the artists own special style and speculate the corresponding painter of a picture
* Exploring the relationship between different artists in same gendre: By exploring the connections between paintings within the same gendre, we want to summarize their similarity and learn more about each gendre 
* Transfering a picture to different gendre: By reconstructing images in the style of another gendre, we want to transfer a picture to any gendre we liked, or make pictures look more artistic by adding different filters

All the axis we mention above could be solved by developing successful neural networks. 

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

### Related work


> - What others have already done with the data?

1. Predicting Artist from Artwork
    * [WebApp](https://github.com/SupratimH/deepartist-web-application)
    * [Classification Model](https://github.com/raunit-x/Best-Artworks-of-All-Time)
2. Analyzing Painters' Age

    [Data Visualization Focusing on Age](https://www.kaggle.com/code/nidaguler/data-visualization-best-artworks-of-all-time)

3. Generating Art

    [GAN for Artwork Generation](https://www.kaggle.com/code/isaklarsson/gan-art-generator)

4. Style Transfer

    [Reconstructing Images in the Style of Another Image](https://www.kaggle.com/code/basu369victor/style-transfer-deep-learning-algorithm)

> - Why is your approach original?

   We provide a more comprehensive and interactive guide into the artworks of the 50 most influential artists of all time. By browsing through our website, people can not only familiarize themseleves with various painters and genres through collections of artworks, but also learn visually how painting styles have evolved throughout a paticular painter's life and how artworks in general have evolved throughout history. To make it interactive, people can not only choose the painters or genres they want to inspect more closely, but also test their knowledge by guessing the painters of images and transfer their own photos to the style of their favourite artworks. 

> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).

   * [A Beautiful Piece](https://www.kirellbenzi.com/art/these-are-not-flowers) that was constructed by a neural network trained from 1 million pictures.

   * [Visualization of Van Gogh's Life](https://www.artistsnetwork.com/art-history/van-gogh-life-in-pieces/?epi)

## Milestone 2 

**10% of the final grade**


## Milestone 3 

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone
