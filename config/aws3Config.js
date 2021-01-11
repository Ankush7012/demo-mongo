var aws=  require('aws-sdk');
 const s3 = new aws.S3({
    accessKeyId: 'AKIAQPZEUYJXNGU5NCUU',
    secretAccessKey: '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',
    Bucket: 'examcbt-bucket-test'
   });

module.exports = {
    s3Config : { 
        bucket:'examcbt-bucket-test',

    },
    s3

}