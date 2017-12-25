webpackJsonp([0x769e0f5f682a],{381:function(e,a){e.exports={data:{site:{siteMetadata:{title:"Mathias Schilling - Just another paper cut survivor and software engineer",author:"Mathias Schilling"}},markdownRemark:{id:"/home/mathias/dev/com.matchilling.www/src/pages/article/2017-12-24-storing-security-sensitive-data-using-aws-kms-and-openssl/index.md absPath of file >>> MarkdownRemark",html:'<blockquote>\n<p><em>TL;DR:</em> In this post, I am going to introduce a method using AWS KMS, envelope encryption and OpenSSL as an alternative for securing private data in your public GitHub repositories. You will learn how to use AWS KMS and how to implement your own encryption mechanism. Finally, I have created a repository with an example shell implementation. Check out the <a href="https://github.com/matchilling/aws-kms-boilerplate">aws-kms-boilerplate repository on GitHub</a> and have a look at the <code>encrypt</code> and <code>decrypt</code> shell scripts in the <code>bin/</code> directory.</p>\n</blockquote>\n<p>\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 47.69475357710652%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAKABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAECBAX/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//aAAwDAQACEAMQAAAB5d8oVIKX/8QAGBAAAgMAAAAAAAAAAAAAAAAAAQIDEiD/2gAIAQEAAQUCQKRWPP8A/8QAGBEAAgMAAAAAAAAAAAAAAAAAAQIQETH/2gAIAQMBAT8BDCsj/8QAFREBAQAAAAAAAAAAAAAAAAAAEBH/2gAIAQIBAT8Bh//EABkQAAEFAAAAAAAAAAAAAAAAAAACESAhMv/aAAgBAQAGPwK1Mbj/AP/EABkQAAIDAQAAAAAAAAAAAAAAAAABICExwf/aAAgBAQABPyHWQd3A9h//2gAMAwEAAgADAAAAENPf/8QAFhEBAQEAAAAAAAAAAAAAAAAAEQEQ/9oACAEDAQE/EIgM/8QAFxEBAAMAAAAAAAAAAAAAAAAAARARMf/aAAgBAgEBPxBV7H//xAAZEAADAAMAAAAAAAAAAAAAAAAAARExQWH/2gAIAQEAAT8QvuBBLZMQxUEMZ//Z\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Painlessly storing security sensitive data using AWS KMS"\n        title="Photo by Matthew Brodeur"\n        src="/static/what-the-fuck-3eb769a935eeddcda4e57624e4f798a8-631b1.jpeg"\n        srcset="/static/what-the-fuck-3eb769a935eeddcda4e57624e4f798a8-30fbd.jpeg 200w,\n/static/what-the-fuck-3eb769a935eeddcda4e57624e4f798a8-e87dc.jpeg 400w,\n/static/what-the-fuck-3eb769a935eeddcda4e57624e4f798a8-631b1.jpeg 800w,\n/static/what-the-fuck-3eb769a935eeddcda4e57624e4f798a8-300e3.jpeg 1200w,\n/static/what-the-fuck-3eb769a935eeddcda4e57624e4f798a8-c15ef.jpeg 1600w,\n/static/what-the-fuck-3eb769a935eeddcda4e57624e4f798a8-f76af.jpeg 1887w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  </p>\n<p><a href="http://twitter.com/bpedro">Bruno Pedro</a> wrote a brief article recently on <a href="https://dev.to/bpedro/how-to-securely-store-api-keys-ab6">dev.to</a> about storing application credentials securely alongside your code and provided a short list of different solutions including <code>git-crypt</code>, <code>git-secret</code>, <code>git-remote-gcrypt</code> and Stack Overflow’s <a href="https://github.com/StackExchange/blackbox">BlackBox tool</a>.</p>\n<p>While most of the tools are doing an excellent job I found, that one more or less obvious solution was missing in his enumeration. Because chances are high, that you are already running infrastructure/ code leveraging Amazon Web Services you may find a solution which doesn’t add another new service to your stack attractive.</p>\n<p>The alternative I am going to briefly introduce uses <a href="https://aws.amazon.com/kms/">Amazon’s Key Management Service (KMS)</a> and <a href="https://www.openssl.org">OpenSSL</a>.</p>\n<h2>Amazon’s key management service (KMS)</h2>\n<p>AWS KMS is a fully managed service that makes it easy to create and control encryption keys on AWS which can then be utilised to encrypt and decrypt data in a safe way. The service leverages <a href="https://en.wikipedia.org/wiki/Hardware_security_module">Hardware Security Modules (HSM)</a> under the hood which in return guarantees security and integrity of the generated keys.</p>\n<p>Compliance and security monitoring are ensured in KMS by using key-based permission policies and integrating with Amazon’s Identity and Access Management (IAM) which allows access management to a very granular level. KMS also offers hassle-free key-rotation and logs all events associated with a given key to AWS CloudTrail by default.</p>\n<p>Let’s go quickly through the three <strong>main concepts</strong> KMS is based on before diving into the code example.</p>\n<h3>KMS main concepts</h3>\n<p>KMS utilises <a href="https://en.wikipedia.org/wiki/Symmetric-key_algorithm">symmetric encryption</a> which means that the same key is used for encryption and decryption. We differentiate between two type of keys:</p>\n<ul>\n<li>\n<p>The <strong>Customer Master Key (CMK)</strong> is a logical key which represents the primary resource in AWS KMS. Master keys are either customer- or AWS managed and can be used to encrypt up to 4 kilobytes (4096 bytes) of raw data directly. CMKs are unique to your AWS account and the AWS region in which they are used.</p>\n</li>\n<li>\n<p><strong>Data Keys</strong> are used to encrypt large data objects which exceed the 4KB-master-key limit. Be aware that Amazon Key Management in contrast to CMKs does not store any <em>Data Keys</em> and that the plain- and ciphertext of the generated key is being exposed.</p>\n</li>\n</ul>\n<h3>Basic vs. Envelope encryption</h3>\n<p>The following diagram illustrates AWS KMS’ <strong>basic encryption</strong>.  The <a href="http://docs.aws.amazon.com/cli/latest/reference/kms/encrypt.html">encrypt command</a> encrypts plaintext into ciphertext by using your <em>Customer Master Key</em> (CMK).</p>\n<p><a href="/aws_kms_basic_encryption-a5c188342278389f1c1da6d779b1c991.svg">\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 413px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 43.34140435835351%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAABMklEQVQoz2NgIACkpaX5paSkeIBYzMjIiJGBUgA0yACIpYFYV05OjpViA0MKdIUSGo0ryubaaRClYe7cufZnzpxp6+vrY8RiWFx4qd6p+Hqj/yWzbR/mTrJqA4krKCgwAV2cBVM3efLk2NbWVvubN2/WgLzEAjTQd86cORZANi8MA8NOIihPZwYQ/wcZWDrHDoSvycrKsgLl+IBqDIG0KBBzT5w40W3atGlmy5Yty2aYNWtWVU9Pjx3QFgtk1ykrKzMG5et4oRnYgaxGRUUF7Kuurq5woA9Ldu3a1cgANDVm0aJFjjNnzrTAFiRAA89ADfxUOtdOEpuaSZMmBQGxOdBRngwtLS2SIFxTU4M1BsOK9QQSG41nlc+31yI2WcgAsRIwLLjITFYskpKSSkBaEYilAA69bq5PBrB7AAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Basic encryption with AWS KMS"\n        title=""\n        src="/static/aws_kms_basic_encryption-593c9ed2bdab78cecf833bfd09a9c8c3-1fc1a.png"\n        srcset="/static/aws_kms_basic_encryption-593c9ed2bdab78cecf833bfd09a9c8c3-3a0df.png 200w,\n/static/aws_kms_basic_encryption-593c9ed2bdab78cecf833bfd09a9c8c3-d7efc.png 400w,\n/static/aws_kms_basic_encryption-593c9ed2bdab78cecf833bfd09a9c8c3-1fc1a.png 413w"\n        sizes="(max-width: 413px) 100vw, 413px"\n      />\n    </span>\n  </span>\n  </a></p>\n<p>Using <strong>basic encryption</strong> is straightforward, but it comes with a couple of drawbacks. First, encrypting a significant amount of data is expensive as you have to transmit all your data over the wire in order to encrypt it on Amazon’s server. Secondly, transferring data over a network could cause potential security breaches and lead to an unauthorised disclosure of, or access to your data. Third, the built-in 4KB limitation prevents you from encrypting large files like for example server certificates etc. Sure, you could chunk the data up and reassemble it later during decryption, but rather than doing that let us have a look how we can do better by applying envelope encryption.</p>\n<p><strong>Envelope Encryption</strong> is a practice of encrypting plaintext data with a unique <em>Data Key</em>, and then encrypting the <em>Data Key</em> with a key encryption key (KEK).</p>\n<p><a href="/aws_kms_envelope_encryption-b74a74c7cef7faaf8be2a92b555aeeb1.svg">\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 387px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 83.20413436692505%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsSAAALEgHS3X78AAACdElEQVQ4y2NQUlJilpaW5gFiDikpKT4GSgHQEEEgtgFiRSDWA4nJysoyUmRoRJm+VFqnWRC6ONDVjEBLhIFYGop5CRoWW2OYFVygcyejx/xvwTTrpflTra1B4vf/lzBCfcACxKxAzKGsrMwEtIRNXV1dBCQ3Y8YM687OTpv9+/fXnj592uf///+MDIG52j+C8nX+ZfVa/C+dYwfCk0CKO7d7sAC9zgw1tACI86FsZRkZmWAgU2TevHm6EydO1J02bZr9rFmzwjo6OthABp4IBhqY3W/5v3Su3dfimbYZQMUsBpbK/EDXiEMjyxCILaEGCmlra4O8LgQ0wKinpye0trY28/LlyxvPnz/vBjIwBOjC/7kTrUCuu1W50IFl4iFfJrSI4wC6lgPG//fvHzg4Jk+ebADEDt3d3SYbNmxoXrduHReDibssU0iB7oyMbvN3FQvsnUEKH/2vYEQzUAjoUkGgoWxA73Jgi4vq6mrusrIyiL7l9yIYU9pMhfEkLZC3OaFsbSCWgLL5gFgFmuTkQemZqGQFdBk7UDE31BB3ILagKJ0CvckqLy/PipQ+uUGuAyYf0jIAMJ3xALH5nDlzfHfv3h3++PFjGZD44sWLmYAGcsOSFdEAmLbEp0+frgViHzt2LOvcuXMBIPatW7eY5eTkmKBB4AvEfqAMQNDAuXPnCgOThMWUKVNipk6dWt3c3CwPEv/16xcjkoEgw7SJdaFoX1+fYX9/vyowvfkDDVcAid+4cYMRKQVIAcOUkygDgdmKZebMmTpAlzrPnj3bF8hWAol//vyZvNJIUVGRGegAUSiWALqED6nIE4WWQDJSECABIgB8MsoK/vDJ3wAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Envelope encryption with AWS KMS"\n        title=""\n        src="/static/aws_kms_envelope_encryption-4d8de2bcccb9426c8e32e824e79470fc-11a2c.png"\n        srcset="/static/aws_kms_envelope_encryption-4d8de2bcccb9426c8e32e824e79470fc-e4ab2.png 200w,\n/static/aws_kms_envelope_encryption-4d8de2bcccb9426c8e32e824e79470fc-11a2c.png 387w"\n        sizes="(max-width: 387px) 100vw, 387px"\n      />\n    </span>\n  </span>\n  </a></p>\n<p>The diagram above shows the data encryption process in which the KMS service produces a <em>Data Key</em> against our previously defined <em>Customer Master Key</em>, which is then used to encrypt our documents. The main difference compared to the previous method is that encryption is done locally in the client. Because we do not have to transmit the plaintext over the wire, we gain a significant performance boost while still keeping our sensitive data safely stored on our server.</p>\n<h2>Getting started</h2>\n<p>In the following code example, I will demonstrate the core functions which are used in the <a href="https://github.com/matchilling/aws-kms-boilerplate">aws-kms-boilerplate repository</a>. I am going to assume that you have setup your AWS credentials correctly.</p>\n<h3>1. Create a customer master key (CMK)</h3>\n<p>The first step is to create a <em>Customer Master Key</em>. You can skip this step if you have already set up one which you want to use. You can retrieve a list of all your available master keys with the following AWS CLI command:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ aws kms list-keys\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">"Keys"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n    <span class="token property">"KeyArn"</span><span class="token operator">:</span> <span class="token string">"arn:aws:kms:region:************:key/********-****-****-****-************"</span><span class="token punctuation">,</span>\n    <span class="token property">"KeyId"</span><span class="token operator">:</span> <span class="token string">"********-****-****-****-************"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>If you don’t have a <em>Customer Master Key</em> set up, or you want to use another one you can quickly create a new key with the following command:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ aws kms create-key\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">"KeyMetadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"Origin"</span><span class="token operator">:</span> <span class="token string">"AWS_KMS"</span><span class="token punctuation">,</span>\n    <span class="token property">"KeyId"</span><span class="token operator">:</span> <span class="token string">"********-****-****-****-************"</span><span class="token punctuation">,</span>\n    <span class="token property">"Description"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>\n    <span class="token property">"Enabled"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">"KeyUsage"</span><span class="token operator">:</span> <span class="token string">"ENCRYPT_DECRYPT"</span><span class="token punctuation">,</span>\n    <span class="token property">"KeyState"</span><span class="token operator">:</span> <span class="token string">"Enabled"</span><span class="token punctuation">,</span>\n    <span class="token property">"CreationDate"</span><span class="token operator">:</span> <span class="token number">1513813027.113</span><span class="token punctuation">,</span>\n    <span class="token property">"Arn"</span><span class="token operator">:</span> <span class="token string">"arn:aws:kms:region:************:key/********-****-****-****-************"</span><span class="token punctuation">,</span>\n    <span class="token property">"AWSAccountId"</span><span class="token operator">:</span> <span class="token string">"************"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h3>2. Create a key alias (optional)</h3>\n<p>Assigning an alias to your master key is a handy thing to do as it simplifies the key-usage especially when you’re in your terminal and typing command manually. Most of the AWS KMS commands accept an alias as the <code>--key-id</code> parameter, so you don’t have to refer to the key by its long id.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ aws kms create-alias \\\n  --alias-name <span class="token string">\'alias/kms-tutorial\'</span> \\\n  --target-key-id <span class="token string">\'********-****-****-****-************\'</span>\n</code></pre>\n      </div>\n<h3>3. Create a data key</h3>\n<p>With our new CMK will now generate a <em>Data Key</em> using the <code>generate-data-key</code> command which returns a data encryption key that we will later use to encrypt data locally. Note that we have defined the <code>--key-spec</code> parameter to generate a 256-bit long symmetrical encryption key using the <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard">AES algorithm</a>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ aws kms generate-data-key \\\n  --key-id <span class="token string">\'alias/kms-tutorial\'</span> \\\n  --key-spec <span class="token string">\'AES_256\'</span> <span class="token operator">></span> <span class="token string">\'./.key/data_key.json\'</span>\n</code></pre>\n      </div>\n<p>Note that the <code>Plaintext</code> and <code>CiphertextBlob</code> properties in the returned JSON are base64 encoded and that the <code>KeyId</code> does not refer the generated <em>Data Key</em> but to the <em>Customer Master Key</em>.</p>\n<p><strong>It is important to understand that AWS KMS does not keep any records of your <em>Data Key</em> on their servers ~ so you have to manage those keys by yourself.</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">"Plaintext"</span><span class="token operator">:</span> <span class="token string">"4XY5FgHP1JyH7SkNYjY6C6gpZlWLbG0jkw06dVu0B4I="</span><span class="token punctuation">,</span>\n  <span class="token property">"KeyId"</span><span class="token operator">:</span> <span class="token string">"arn:aws:kms:region:************:key/********-****-****-****-************"</span><span class="token punctuation">,</span>\n  <span class="token property">"CiphertextBlob"</span><span class="token operator">:</span> <span class="token string">"AQIDAHiP2nl/OYfqakZzv1qo7ir0iHai3O1Utd4q71Louy78XgGOk8YwfNOJo77u6nxAye/RAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMWfzIpfhT/iCHuZBdAgEQgDvFMB7ItgfGhdDdKZj6dMpzdiyYLuGKXNK2WpCrl1wi0S8uCZdtKpllJMNlhLaRVeX0ghxMqD+JK8gSfQ=="</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h3>4. Storing the CipherTextBlob</h3>\n<p>Next, we are going to extract the <code>CipherTextBlob</code> from the <code>data_key.json</code> and base64 decode and store it in our repository. The OpenSSL toolkit provides a base64 implementation which we will use for the decoding.</p>\n<p><strong>The blob contains meta-data about which CMK was used during data key creation. It will allow us to retrieve the plaintext key later on decryption.</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ <span class="token function">sed</span> -nr <span class="token string">\'s/^.*"CiphertextBlob":\\s*"(.*?)".*$/\\1/p\'</span> <span class="token string">\'./.key/data_key.json\'</span> \\\n  <span class="token operator">|</span> openssl base64 -d <span class="token operator">></span> <span class="token string">\'./.key/ciphertext_blob_decoded\'</span>\n</code></pre>\n      </div>\n<h3>5. Encrypting the data</h3>\n<p>Before we can start to encrypt our example data, we need to extract, and base64 decode the plaintext key from the <code>data_key.json</code> as we did with the <code>CipherTextBlob</code> in the previous step.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ <span class="token function">sed</span> -nr <span class="token string">\'s/^.*"Plaintext":\\s*"(.*?)".*$/\\1/p\'</span> <span class="token string">\'./.key/data_key.json\'</span> \\\n  <span class="token operator">|</span> openssl base64 -d <span class="token operator">></span> <span class="token string">\'./.key/plaintext_key_decoded\'</span>\n</code></pre>\n      </div>\n<p>As we now have stored the decoded cypher- and plaintext key in our <code>.key/</code> directory we can get rid of the <code>data_key.json</code> file as it is no longer needed.</p>\n<p><em>Note that we are using the <a href="https://linux.die.net/man/1/shred"><code>shred</code></a> command rather than a simple <code>rm</code> to delete the key file securely.</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ shred \\\n  --iterations<span class="token operator">=</span>100 \\\n  --remove<span class="token operator">=</span>wipesync \\\n  --zero <span class="token string">\'./.key/data_key.json\'</span>\n</code></pre>\n      </div>\n<p>Finally, we can start to encrypt our data using OpenSSL and AES. In the following example we encrypt <code>.decrypted/database.json</code> with the plaintext key and store the result in <code>.encrypted/database.json</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ openssl enc -e -aes256 \\\n  -k <span class="token string">\'fileb:///./.key/plaintext_key_decoded\'</span> \\\n  -in <span class="token string">\'.decrypted/database.json\'</span> \\\n  -out <span class="token string">\'.encrypted/database.json\'</span>\n</code></pre>\n      </div>\n<p>Next, we delete the plaintext key, but before doing so, we make sure that the base64 decoded <code>CipherTextBlob</code> has been stored correctly as the blob will be the only way to recover and decrypt our saved data.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ shred \\\n  --iterations<span class="token operator">=</span>100 \\\n  --remove<span class="token operator">=</span>wipesync \\\n  --zero <span class="token string">\'./.key/plaintext_key_decoded\'</span>\n</code></pre>\n      </div>\n<h3>6. Decrypting the data</h3>\n<p>Decrypting data is the most straightforward part. As we have deleted the plaintext key after finishing our encryption, we need to restore it first by leveraging the <code>aws kms decrypt</code> command.</p>\n<p>Because the <code>CipherTextBlob</code> contains meta-data, we do not need to tell KMS which CMK was used for the <em>Data Key</em> during creation-time.</p>\n<p>Note that the original response from the decrypt command returns a JSON object with the <em>Customer Master Key Id</em>. The query parameter allows us only to return the property we are interested in, which is handy as JSON manipulation in the terminal without libraries such as <code>awk</code>, or <code>jq</code> is quite messy and error-prone.</p>\n<p>Before using the plaintext key, we need to base64 decode the response as we’ve done before.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ aws kms decrypt \\\n  --ciphertext-blob <span class="token string">\'fileb://./.key/ciphertext_blob_decoded\'</span> \\\n  --query <span class="token string">\'Plaintext\'</span> \\\n  --output text <span class="token operator">|</span> openssl base64 -d -out <span class="token string">\'./.key/plaintext_key_decoded\'</span>\n</code></pre>\n      </div>\n<p>Last, we pass the plaintext key to OpenSSL, and we get our encrypted example data decrypted.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>$ openssl enc -d -aes256 \\\n  -k <span class="token string">\'fileb://./.key/plaintext_key_decoded\'</span> \\\n  -in <span class="token string">\'.encrypted/database.json\'</span> \\\n  -out <span class="token string">\'.decrypted/database.json\'</span>\n</code></pre>\n      </div>\n<h3>7. Log &#x26; audit CMK activity</h3>\n<p>AWS Key Management Service integrates with <a href="https://aws.amazon.com/cloudtrail/">CloudTrail</a>, which captures API calls made by or on behalf of AWS KMS in your AWS account and writes the logs to an Amazon S3 bucket that you specify.</p>\n<p>With CloudTrail’s help, you can determine what request was made, the source IP address from which the request was made, who made the request, when it was made, and so on.</p>\n<h2>AWS KMS boilerplate</h2>\n<p>To make it easier for you to implement an encrypting mechanism for your project, I have created an accompanying <a href="https://github.com/matchilling/aws-kms-boilerplate">repository on GitHub</a>, which should help to demonstrate the basic usage of AWS KMS, OpenSSL and how to store sensitive data securely along with your code.</p>\n<p><strong>Basic usage:</strong></p>\n<ul>\n<li>Setup your AWS account</li>\n<li>Create an AWS KMS <em>Customer Master Key</em> as described and assign an alias to it as described in step 1 and 2.</li>\n<li>Place your security sensitive data such as API keys, database credentials etc. in the <code>.decrypted/</code> folder.</li>\n<li>For encryption execute <code>./bin/encrypt --kms-id=alias/your-key</code>.</li>\n<li>For decryption execute <code>./bin/decrypt</code>.</li>\n<li><em>Note: activate the debugging mode by passing <code>--debug=true</code> into the script</em></li>\n</ul>\n<p>For further details check the <code>encrypt</code> and <code>decrypt</code> shell scripts in the <code>bin/</code> directory. Both scripts contain lots of comments which should make it trivial to follow the program.</p>\n<h2>Final words</h2>\n<p>By now you should have got a good grasp of the central concepts behind AWS KMS, envelope encryption and you should also be able to implement an encryption mechanism for your project. I hope the examples provided in this post as well as in the accompanying repository on GitHub were of any help.</p>\n<p>Keep in mind that security breaches do occur all the time! And <a href="https://www.infoworld.com/article/3193028/security/annual-verizon-security-report-says-sloppiness-causes-most-data-breaches.html">most breaches</a> are caused because someone did something that he was not supposed to do, or someone did not do something that he was supposed to do.</p>\n<p>It is almost 2018, and I still see plenty of enterprise projects where database credentials are stored in plaintext under version control <img class="emoji-icon" data-icon="emoji-see_no_evil" style="display: inline; margin: 0; position: relative; top: 5px; width: 25px" src="data:image/png;base64, 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" />.</p>\n<p>As an IT professional you must take security seriously! Securing your data with proper methods like aforementioned or described in <a href="https://dev.to/bpedro/how-to-securely-store-api-keys-ab6">Bruno’s post</a> could be the decisive factor which saves the day if the worst case occurs.</p>\n<p><strong>There is absolutely no excuse for not encrypting security-sensitive data!</strong></p>\n<h2>References</h2>\n<ul>\n<li><a href="https://github.com/matchilling/aws-kms-boilerplate">AWS KMS Boilerplate</a></li>\n<li><a href="https://docs.aws.amazon.com/kms/latest/developerguide/overview.html">AWS Key Management Service Developer Guide</a></li>\n<li><a href="https://www.openssl.org/docs/">OpenSSL Documentation</a></li>\n</ul>\n<p><em>Found an issue? Please drop me a line via email/ twitter or open a <a href="https://github.com/matchilling/aws-kms-boilerplate/pulls">pull request on GitHub</a>!</em></p>',
frontmatter:{date:"24 December, 2017",hn_id:16004298,path:"/storing-security-sensitive-data-using-aws-kms-and-openssl/",tags:"aws, aws kms, encryption, key management, openssl, security",title:"Painlessly storing security sensitive data using AWS KMS and OpenSSL"},wordCount:{words:1733}}},pathContext:{path:"/storing-security-sensitive-data-using-aws-kms-and-openssl/"}}}});
//# sourceMappingURL=path---storing-security-sensitive-data-using-aws-kms-and-openssl-8807313549bbccd107bb.js.map