# Image-Exif-Project---6
Image Exif Project - 6

Samet Taspinar,
Piyush Chaudhary,
Rewa Jayant Kale

#Project Description 
This project provides visualization for the trends in camera brand/model usage in Abu Dhabi. The exif header of 1.4M images are obtained from Flickr and based on those exif data, we visualized and tried to understand more of the trends.

This project provides answers for the following questions:
  - What is the distribution of commonly used camera models over time, is there any trend?
  - What are the most popular settings for cameras (resolution, brightness, white balance)?
  - What are the most popular brands?

#Files
This project consist of one .html file, one .css file and 5 .js files. Along with these, we summarized the data in a .json file and 5 .csv files that contains only the information we needed for the project. 

main.html is the main file from which we create the page and main.css contains the styles that make the page visually engaging. main.html also contains preprocessing function which reads whole figure1_filt50.json and stackeddata.csv only once when the page is opened and never re-opens it. This helps us not to read the files over and over again.

fig1.js, fig2.js, fig3.js, and fig4.js are for rendering each figure, respectively. functions.js contains multiple functions related to string manipulations, array operations and interactions. 

.json and .csv files contain a good summary of the sql database that contains Exif header of approx. 1.4M images. 

fig1-4.js have render_fig1-4 functions which is the runner function for each figure. 

svgs, axis information, tooltips, and other visualization elements can be found in each individual file. 

The video presentation of the project can be found: https://youtu.be/EVPqch65aCI

The final report is: https://github.com/smttsp/Image-Exif-Project-6/blob/master/IV_Image_Exif_Project_6_final_report.pdf 
