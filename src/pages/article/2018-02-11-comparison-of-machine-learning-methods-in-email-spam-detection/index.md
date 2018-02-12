---
date  : 2018-02-11T21:51:21.275Z
hn_id : 16365895
path  : /comparison-of-machine-learning-methods-in-email-spam-detection/
tags  : classification algorithms, unsolicited email, spam
title : "Comparison of machine learning methods in email spam detection"
---

Unsolicited bulk emails, also known as Spam, make up for approximately 60% of the global email traffic. Despite the fact that technology has advanced in the field of Spam detection since the first unsolicited bulk email was sent in 1978 spamming remains a time consuming and expensive problem.

This report compares the performance of three machine learning techniques for spam detection including __[Random Forest](https://www.stat.berkeley.edu/~breiman/RandomForests/cc_home.htm) (RF)__, __[k-Nearest Neighbours](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) (kNN)__ and __[Support Vector Machines](https://en.wikipedia.org/wiki/Support_vector_machine) (SVM)__.

## Introduction

Despite the rising popularity of instant messaging technologies in recent years, email continues to be the dominant medium for digital communications for both consumer and business use. Following industry estimations (Symantec Corporation, 2016, pp 31 [^1]), approximately 200 billion emails were sent each day in 2015. On average, business users sent and received around 42 emails per day. Given those facts, it is no wonder that email is still the weapon of choice for cybercriminals who want to target the broadest possible audience electronically.

According to Nucleus Research (Nucleus Research, 2007 [^2]), spam costs US businesses an average of $712 per employee every year due to diminished productivity, lost customers, spent bandwidth and increasing the cost of maintenance.

Estimates (Statista, 2017 [^3]) are that slightly less than 60 percent of the incoming business email traffic is unsolicited bulk email (known as spam) which was the lowest level since 2003. However, even though the global percentage of spam/ non-spam ratio is decreasing, the competition between spammers and spam filtering techniques continuous. It is fair to say that the problem is not going away, and the need for reliable anti-spam filters remains high.

The idea of automatically classifying spam and non-spam emails by applying machine learning methods has been pretty popular in academia and has been a topic of interest for many researchers.

Knowledge engineering and machine learning are the two main approaches scientists have been applied to overcome the spam-filtering problem. The first solution focuses on creating a knowledge-based system in which pre-defined rules dictate if an incoming message is legitimate or not. The primary disadvantage of this method is that those rules need to be maintained and updated continuously by the user or a 3rd party like for example a software vendor.

The machine learning approach, in contrast, does not require pre-defined rules, but instead messages which have been successfully pre-classified. Those messages make the training dataset which is being used to fit the learning algorithm to the model. One could say the algorithm defers the classification rules from the test data.

This study compares three algorithms which are suitable for classification problems. In particular, we included the following methods:
- Random Forest
- k-Nearest Neighbours
- Support Vector Machines with Linear Kernel

For the experiment, we use [Hewlett Packard’s _Spambase_](https://archive.ics.uci.edu/ml/datasets/spambase) dataset which is publicly available and downloadable from the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php).

## Methods

The following part provides a brief introduction to the three methods used for the experiment and compares general advantages and disadvantages.

### Random Forest

Tin Kam Ho first introduced the general method of random decision forests at AT&T [Bell Labs](https://www.bell-labs.com/) in 1995 (Tin Kam Ho, 1995 [^4]). The thought is, that

> If one tree is good, then many trees (a forest) should be better.
>
> <cite>Stephen Marsland, 2014, p. 275 [^5]</cite>

The algorithm deducts the classification label for new documents from a set of decision trees where for each tree, a sample is selected from the training data, and a decision tree is created by choosing a random subset of all features (hence "Random"). The algorithm is suitable for complex classification tasks in small datasets (Breiman, 2001 [^6]). By averaging multiple trees, random-forest-based models have a significantly lower risk of _overfitting_ and include less _variance_ compared to decision trees. The major drawback is performance as a large number of trees may make the method slow for real-time prediction.

### k-Nearest Neighbours

The k-nearest neighbour (kNN) classifier is a straightforward method and works well for simple recognition problems. It is considered as an example-based classifier because the training data is used for comparison and not for explicit category representation. In literature, the term _lazy-learner_ is also often related to kNN.

When a new document needs to be categorised, kNN tries to find the k nearest neighbours (most similar documents) in the training dataset. Given that, enough neighbours are found and have been categorised, kNN uses their profile to assign the new document to the same category. This comparison is a real-time process, and therefore the main drawback of this approach is that the kNN algorithm must compute the distance and sort all the training data for each prediction, which can be slow if given a large training dataset (James, Witten, Hastie, & Tibshirani, 2013, pp. 39–42 [^7]).

### Support Vector Machines

The original Support Vector Machines algorithm was designed by Vladimir N. Vapnik and Alexey Ya. Chervonenkis in 1963 (Vapnik & Chervonenkis, 1964 [^8]). SVM has its foundation in the broad concept of decision planes which define the decision boundaries. Decision planes separate distinct objects by finding the optimal hyperplane with the maximum margin between two separate classes.
SVM provides high accuracy on small and clean datasets but tends to perform less efficient on noisier datasets with overlapping classes (James et al., 2013, pp. 349–359 [^7]).

## Procedure

The following part describes the experiment procedure including exploratory data analysis, model fitting, evaluation and prediction.

### Exploratory Data Analysis

The _Spambase_ dataset was composed by Mark Hopkins, Erik Reeber, George Forman, and Jaap Suermondt at Hewlett-Packard Labs. The set includes a total of 4601 observations from Mr Foreman’s personal email account, 2788 messages are classified as _Non-Spam_ and 1813 were effectively _Spam_ (cf. figure 1).

![Figure 1. Non-Spam vs. Spam](./figure-1-non-spam-vs-spam.png 'Figure 1. Non-Spam vs. Spam')

58 different attributes were computed of which 57 are continuous and one is a nominal class label. Typically, documents are represented as vectors of word frequencies. The dataset includes measurements for 6 character frequencies and 48 different word frequencies such as "Internet", "George" (Mr Foreman’s first name), "Credit". Furthermore, three data points were collected which represent the average, the maximum and the total length of character sequences in uppercase (cf. figure 2).

![Figure 2. Attribute Information Spambase](./figure-2-attribute-information-spambase.png 'Figure 2. Attribute Information Spambase')

### Feature Selection

A widely used algorithm for automatic feature selection is Recursive Feature Elimination or RFE. It is based on the idea of repeatedly constructing models and select either the worst- or best-performing feature. RFE than removes the feature from the stack and repeats the process with the remaining features in the set.

Figure 3 illustrates RFE applied with a Random Forest algorithm to the _Spambase_ dataset. All 57 attributes have been selected in the example, although the plot shows that selecting just 44 attributes provide similar accuracy.

![Figure 3 . Feature selection using RFE algorithm](./figure-3-feature-selection-using-rfe-algorithm.png 'Figure 3 . Feature selection using RFE algorithm')

### Classification tree

Another handy technique in data mining is recursive partitioning. This method helps to visualise the decision rules for a particular prediction. Figure 4 shows an example of a classification tree on the _Spambase_ dataset.

![Figure 4. Classification Tree Spambase](./figure-4-classification-tree-spambase.png 'Figure 4. Classification Tree Spambase')

### Training

After we have completed our initial data exploration analysis, we now prepare the data and train our models using the three describe methods. The data preparation involves the following steps:

- Set human readable column names on the data frame
- Replace the class data with descriptive label where zero represents "Non-Spam" and a one marks a record as "Spam"
- Cast the class column to data type factor as the caret package complains if labels are 0 or 1
- Take samples from 1000 and split those into test and training sets randomly with a training/ test ratio of 70%

## Prediction and evaluation

Finally, after we have completed the training step for all three models let us have a look how they compare to each other regarding performance. We compare the performance of all three approaches by evaluating the most commonly used indicators: spam precision (SP), spam recall (SR) and accuracy (A). All three indicators originate from the confusion matrix of each model (cf. figure 5).

- __Spam precision__ is the percentage of correct results divided by the number of all returned results
- __Spam recall__ is the percentage of all Spam emails which are correctly classified as Spam
- __The accuracy__ is the percentage of all emails that are correctly categorised

![Figure 5. Confusion Matrix](./figure-5-confusion-matrix.png 'Figure 5. Confusion Matrix')

The table below summarises the performance result of all three machine learning methods. We determine from the results that _k-Nearest Neighbours (kNN)_ and _Support Vector Machine (SVM)_ perform similar weak regarding accuracy and _Random Forest (RF)_ outperforms both. We see that _RF_ and _SVM_ have the same relatively high percentage of spam recall while _kNN_ performs significantly worse in that category. Finally, we learn that _RF_ has the highest percentage of spam precision and _SVM_ almost 10 points less than _RF_.

| Algorithm            | Spam Precision (SP) | Spam Recall (SR) | Accuracy (A) |
| -------------------- | ------------------- | ---------------- | ------------ |
| Random Forest        | 92.66               | 87.07            | 92.31        |
| k-Nearest Neighbours | 88.07               | 82.76            | 88.96        |
| SVM Linear           | 94.87               | 87.07            | 88.96        |

## Conclusion

By the looks of the result, one could say that using the random forest approach is the gold way, although we need to keep in mind that we have not fine tuned any of those models at all! Therefore due to its design _Random Forest_ performs relatively well "out-of-the-box" compared to _k-Nearest Neighbours_ and _Support Vector Machine_.

## References

[^1]: Symantec Corporation. (2016). [Internet Security Threat Report (Vol. 21)](https://www.symantec.com/content/dam/symantec/docs/reports/istr-21-2016-en.pdf).

[^2]: Nucleus Research. (2007). [Spam costing US Businesses $712 Per Employee](https://nucleusresearch.com/press/nucleus-research-spam-costing-us-businesses-712-per-employee-each-year/).

[^3]: Statista. (2017). [Global spam email traffic share 2014-2017](https://www.statista.com/statistics/420391/spam-email-traffic-share/).

[^4]: Tin Kam Ho. (1995). Random decision forests. [Proceedings of 3rd International Conference on Document Analysis and Recognition, 1, 278–282](https://doi.org/10.1109/ICDAR.1995.598994).

[^5]: Stephen Marsland. (2014). [Machine Learning: An Algorithmic Perspective (2nd ed.). Chapman; Hall/CRC](https://www.crcpress.com/Machine-Learning-An-Algorithmic-Perspective-Second-Edition/Marsland/p/book/9781466583283).

[^6]: Breiman, L. (2001). [Random Forests. Machine Learning, 45 (1), 5–32](https://doi.org/10.1023/A:1010933404324).

[^7]: James, G., Witten, D., Hastie, T., & Tibshirani, R. (2013). [An Introduction to Statistical Learning](https://doi.org/10.1007/978-1-4614-7138-7).

[^8]: Vapnik, V., & Chervonenkis, A. (1964). A note on one class of perceptrons. Automation and Remote Control, 25.
