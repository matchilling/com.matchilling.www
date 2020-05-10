webpackJsonp([0xb040e351e940],{347:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Mathias Schilling - Just another paper cut survivor and software engineer",author:"Mathias Schilling"}},markdownRemark:{id:"/Users/matchilling/dev/com.github/matchilling/com.matchilling.www/src/pages/article/2020-05-11-le-dernier-retro/index.md absPath of file >>> MarkdownRemark",html:'<p>In this post, I will share my experiences on how we measure the effectiveness of our biweekly retrospectives and how we improved the outcome of it in a data-driven way.</p>\n<p>\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 58.103975535168196%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAMABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEAv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/aAAwDAQACEAMQAAABohuUYGlz/8QAGhAAAwEAAwAAAAAAAAAAAAAAAQISAAMEE//aAAgBAQABBQI9kweasj2srvJAFAQf/8QAFREBAQAAAAAAAAAAAAAAAAAAEBH/2gAIAQMBAT8Bp//EABURAQEAAAAAAAAAAAAAAAAAABAR/9oACAECAQE/AYf/xAAeEAACAQMFAAAAAAAAAAAAAAAAEQECEiIhMTJBcf/aAAgBAQAGPwKjB3M4a+j2KcYIhdsUQf/EABoQAQADAQEBAAAAAAAAAAAAAAEAESFBUXH/2gAIAQEAAT8hKmwVD5LO6aQVgv0ufAKkOSY1BVc//9oADAMBAAIAAwAAABBQ3//EABURAQEAAAAAAAAAAAAAAAAAABAR/9oACAEDAQE/EIP/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAgEBPxCkf//EABwQAQEAAgIDAAAAAAAAAAAAAAERACExQVFx0f/aAAgBAQABPxAkrkARdecholNCXie8Cmoi1HAyOqDpeZhUCOK7vzFh9FpVXtXP/9k=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Eva Aeppli - Group of 13, Centre Pompidou Málaga © matchilling"\n        title="Eva Aeppli - Group of 13, Centre Pompidou Málaga © matchilling"\n        src="/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-631b1.jpeg"\n        srcset="/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-30fbd.jpeg 200w,\n/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-e87dc.jpeg 400w,\n/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-631b1.jpeg 800w,\n/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-300e3.jpeg 1200w,\n/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-c15ef.jpeg 1600w,\n/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-3a622.jpeg 2400w,\n/static/grupo-de-13-eva-aeppli-696d8d972c557204813896cd6b907788-2e6f1.jpeg 2943w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  \n<em>Eva Aeppli - Group of 13, Centre Pompidou Málaga © <a href="https://www.instagram.com/p/B66cRY5pJTB/">matchilling</a></em></p>\n<h2>Continuous improvement</h2>\n<p>We should always strive for constant improvement and growth. Regardless of the agile methodology flair which we are applying in our projects, retrospectives and reflections are central to the idea of continuous improvement and therefore fundamental building blocks.</p>\n<p>They, when done well, are excellent tools which enable us to learn from past experiences, to document mistakes, to avoid them in the future hopefully and finally to increase our potential to grow by establishing a continuous improvement cycle.</p>\n<p>According to the <a href="https://www.stateofagile.com/">13th Annual State Of Agile</a> report from 2019, 98% of all the survey respondents state that their organisations follow agile development practises. So the chances are high that you’re likely to be familiar with <a href="https://uit.stanford.edu/pmo/agile-development-methodology">agile methodologies</a> and that retrospectives form already part of your regular day-to-day work routines.</p>\n<p>Adhering retrospectives to routines enables us to be more efficient; it reduces the need for planning and instils good habits in general. But doing so also carries the risk to fall into a lethargy which can have a deadening effect by failing to examine our environment actively.</p>\n<p>Repeating the format, in which you run your retrospectives and always asking the same questions will most likely turn this meeting into a tedious ceremony after a few iterations which will most likely lead to a decreasing energy level and reduced overall participant engagement. A related issue is a case where the team revisits the same problems over and over again - it’s like <a href="https://www.youtube.com/watch?v=tSVeDx9fk60">groundhog day</a>, but without the feel-good ending.</p>\n<p><strong>Quick psychological excursion</strong>: the continuous repetition of a word, eventually leading to a sense where the word has lost its meaning is a psychological phenomenon called <em>Semantic satiation</em>. A great example, how this technique can be used in art is Steve Reich’s pioneering work in experimental music back in the 1960s.</p>\n<iframe src="https://www.youtube.com/embed/0QrZxZzrel8?start=71"></iframe>\n<p>It’s just for illustration purpose, and indeed I’m terribly exaggerating when I compare the above example with occasional monotonous ceremonies. Still, I’m pretty sure every one of you remembers those meetings where it was hard keeping the attention high and struggling not to fall asleep.</p>\n<h2>So what are effective counter-actions to avoid boring retrospectives?</h2>\n<p>One of the most effective counter-actions to prevent retrospective boredom is to change the format over time and not to repeat the same exercise twice. Your team could, for example, create a retrospective exercise repository to store and collect ideas to reduce the planning overhead for the moderator. In fact, another useful technique is to rotate on the facilitator role to keep things moving.</p>\n<p>I’ll not go into much more details as there are tons of online resources available which discuss ways of improving retrospectives in great length and can serve as an inspirational starting point. Some links and further resources are listed at the end of this article. One question though remains …</p>\n<h2>How do you know which format works?</h2>\n<p>First of all, there is no golden rule or guarantee which type of retro will work better and eventually improve the overall outcome for your particular team in your specific organisation. Why? Because we’re all individuals with different educational and cultural backgrounds, who behave and react differently to an external stimulus.</p>\n<p>While having diverse opinions and lively conversations on the subject matter is absolutely desirable, it makes it on the other hand difficult to predict what retrospective fits best your particular circumstances.</p>\n<p>Still, we can learn from other teams and organisations and try new things out in a continuous improvement manner. But first and foremost, the number one recommendation is, do what works for your team!</p>\n<h2>How do you measure the success of your retrospective?</h2>\n<p>Every retrospective should be outcome-focused and should lead to actionable tasks; avoid the do-nothing retro! By the way: this holds for all types of meetings. So, once the team has agreed on trying a new idea, a team member should be assigned to this task and should be accountable for the execution of it so that you can later follow up on the process.</p>\n<p>Now as the retro is part of the whole agile project lifecycle, potential performance metric candidates are the classic velocity or cycle time. These are excellent tools, and you should use at least one of these techniques to benchmark the project progress. However, many parameters can alter the overall result, and you can’t always tell which of them were derived by the retrospective. Therefore, I like to focus on a more narrow-scoped metric to be able to compare the outcome of retrospectives over time.</p>\n<h2>Number of SMART actions</h2>\n<p>One quantitative metric for determining the effectiveness of a retrospective is to just count the number of <em><strong>S</strong>pecific</em>, <em><strong>M</strong>easureable</em>, <em><strong>A</strong>chievable</em>, <em><strong>R</strong>elevant</em>, <em><strong>T</strong>ime-boxed</em> actions.</p>\n<p>Rather than going into huge details, I let the following infographic explain the five attributes your actions should follow:</p>\n<p>\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 600px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 250%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,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\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="SMART goals infographic © matchilling"\n        title="SMART goals infographic © matchilling"\n        src="/static/SMART-goals-infographic-78eed29e1e2e25c71f8b0feb39d9b99b-875ef.png"\n        srcset="/static/SMART-goals-infographic-78eed29e1e2e25c71f8b0feb39d9b99b-7c0fb.png 200w,\n/static/SMART-goals-infographic-78eed29e1e2e25c71f8b0feb39d9b99b-26fe6.png 400w,\n/static/SMART-goals-infographic-78eed29e1e2e25c71f8b0feb39d9b99b-875ef.png 800w"\n        sizes="(max-width: 600px) 100vw, 600px"\n      />\n    </span>\n  </span>\n  \n<em>SMART goals infographic © matchilling - <a href="/SMART-goals-infographic-9e536d6a0bde31c60d893b5b3fc61fbe.pdf" title="Download SMART goals infographic as PDF">Download PDF version</a></em></p>\n<p><em>If you’re curious about the <a href="https://en.wikipedia.org/wiki/SMART_criteria">SMART goal technique</a>, you can find more details in the literature; <a href="https://pragprog.com/book/dlret/agile-retrospectives">Derby, Larson</a> et al. have discussed the topic extensively.</em></p>\n<p>But let’s move on; now that we have an understanding of what SMART actions are, we should ask ourselves how we can increase the number of them as a positive outcome from our retrospectives.</p>\n<p>According to the recommendation made earlier, my hypothesis was that <strong>higher engagement would lead to more SMART tasks</strong>.</p>\n<p>To prove or disprove my hypothesis, I revisited all our past retrospectives and collected the following data points:</p>\n<ul>\n<li>Date of the retro</li>\n<li>Retro format</li>\n<li>Number of participants</li>\n<li>Number of cards posted, classified by sentiment (positive, neutral, negative)</li>\n<li>Number of actions created</li>\n</ul>\n<p>Here is an extraction from the data set:</p>\n<table>\n<thead>\n<tr>\n<th>Date</th>\n<th>5th May</th>\n<th>21st Apr</th>\n<th>7th Apr</th>\n<th>24th Mar</th>\n<th>10th Mar</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Number of Participants</td>\n<td>8</td>\n<td>9</td>\n<td>9</td>\n<td>9</td>\n<td>9</td>\n</tr>\n<tr>\n<td>Number of Cards posted</td>\n<td>42</td>\n<td>26</td>\n<td>22</td>\n<td>23</td>\n<td>26</td>\n</tr>\n<tr>\n<td><em>Positive</em></td>\n<td>19</td>\n<td>11</td>\n<td>12</td>\n<td>9</td>\n<td>17</td>\n</tr>\n<tr>\n<td><em>Neutral</em></td>\n<td>8</td>\n<td>4</td>\n<td>5</td>\n<td>7</td>\n<td>3</td>\n</tr>\n<tr>\n<td><em>Negative</em></td>\n<td>15</td>\n<td>11</td>\n<td>5</td>\n<td>7</td>\n<td>6</td>\n</tr>\n<tr>\n<td>Number of Actions created</td>\n<td>5</td>\n<td>3</td>\n<td>3</td>\n<td>3</td>\n<td>2</td>\n</tr>\n</tbody>\n</table>\n<p>With these data points on hand, I’ve calculated a range of averages:</p>\n<table>\n<thead>\n<tr>\n<th>Date</th>\n<th>5th May</th>\n<th>21st Apr</th>\n<th>7th Apr</th>\n<th>24th Mar</th>\n<th>10th Mar</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Avg. Cards/ Participant</td>\n<td>5.25</td>\n<td>2.89</td>\n<td>2.44</td>\n<td>2.56</td>\n<td>2.89</td>\n</tr>\n<tr>\n<td>Avg. Actions/ Participant</td>\n<td>0.63</td>\n<td>0.33</td>\n<td>0.33</td>\n<td>0.33</td>\n<td>0.22</td>\n</tr>\n<tr>\n<td>Cards/ Actions Ratio</td>\n<td>8.40</td>\n<td>8.67</td>\n<td>7.33</td>\n<td>7.67</td>\n<td>13.00</td>\n</tr>\n</tbody>\n</table>\n<p>An interesting observation which we can spot in the above table is, that no matter how many cards and action items are being created, the ratio between them averages almost out over time. The 95th percentile of the ratio over the whole data set (not only the five shown above) is around eight, meaning one action is being created for every eight cards.</p>\n<p>This sounds quite logically; more cards will inevitably lead to more actions. So given this direct correlation, the question is, <strong>how can we get the participants to create more cards?</strong> And off course, we don’t wanna create them just for the sake of it, they should obviously be meaningful.</p>\n<p>As you might have guessed, the answer to it lies in the level of engagement and the advice mentioned earlier to change the format of your retrospective frequently.</p>\n<table>\n<thead>\n<tr>\n<th>5th May</th>\n<th>21st Apr</th>\n<th>7th Apr</th>\n<th>24th Mar</th>\n<th>10th Mar</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Experiment</td>\n<td>Standard</td>\n<td>Standard</td>\n<td>Standard</td>\n<td>Standard</td>\n</tr>\n</tbody>\n</table>\n<p>As you can see in the table above, we run an experiment on the 5th of May including just a small change from our standard retrospective format. This, in turn, had a positive impact and led to a ~60% increase in cards and actions created.</p>\n<h2>What did we change?</h2>\n<p>Hint: the clue is in the blog post title … We usually use a standard version of the 3Ls (Liked – Learned – Lacked) for our retros. But this time we asked the participants a slightly different question. Rather than narrowing down the scope to the last sprint iteration, we asked them: <strong>“Assuming this is the last retrospective of the project, name things that you’ve liked, learned or that you’ve missed.”</strong></p>\n<p>It was interesting to witness that just this tiny little change had such a positive impact on the meeting outcome. Now you can’t ask this question for the obvious reason at every retrospective, but that’s not the point. The purpose of the experiment was to introduce just a small new stimulus to enable the team to change the way we would think about a given problem.</p>\n<h2>Conclusion</h2>\n<p>So what’s in there for you? Like said before, there is no golden rule and nobody outside of your team can tell you what works best for your circumstances. However, I strongly encourage you to experiment with different formats and introduce little changes here and there from time to time to keep people’s engagement high and to establish a healthy environment for constructive discussions.</p>\n<h2>Further resources</h2>\n<ul>\n<li><a href="https://pragprog.com/book/dlret/agile-retrospectives">Agile Retrospectives: Making Good Teams Great</a> by Esther Derby and Diana Larsen.</li>\n<li><a href="https://www.ucop.edu/local-human-resources/_files/performance-appraisal/How%20to%20write%20SMART%20Goals%20v2.pdf">SMART Goals: A How to Guide</a> from the University of California</li>\n<li><a href="https://retromat.org">Retromat</a> Free resource with thousands of activities for your next retrospective</li>\n</ul>',frontmatter:{date:"11 May 2020",hn_id:null,path:"/le-dernier-retro/",tags:"Agile, Retrospective",title:"Le Dernier Rétro",description:"How to measure and improve the effectiveness of retrospectives in a data-driven way."},wordCount:{words:1437}}},pathContext:{path:"/le-dernier-retro/"}}}});
//# sourceMappingURL=path---le-dernier-retro-9ca48bb16d5d8ae4cc32.js.map