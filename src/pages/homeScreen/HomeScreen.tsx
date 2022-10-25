import { ChangeEvent, FC, useState } from "react";
// import ReactS3Client from "react-aws-s3-typescript";
// import { s3Config } from "../../../s3Config";

import HomeScreenNavbar from "../../components/navbar/HomeScreenNavbar";
import "./homeScreen.scss";

const HomeScreen: FC = () => {
  // const [imgUrl, setImgUrl] = useState<string>("test");
  // const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  // async function uploadFileToS3(fileList: FileList | null) {
  //   const s3Config = {
  //     bucketName: process.env.REACT_APP_BUCKET_NAME || "test",
  //     dirName: "images" /* Optional */,
  //     region: process.env.REACT_APP_REGION || "test",
  //     accessKeyId: process.env.REACT_APP_ACCESS || "test",
  //     secretAccessKey: process.env.REACT_APP_SECRET || "test",
  //     //   s3Url: "https:/your-aws-s3-bucket-url/" /* Optional */,
  //   };
  //   const s3 = new ReactS3Client(s3Config);
  //   if (fileList) {
  //     try {
  //       console.log(fileList[0]);

  //       const res = await s3.uploadFile(fileList[0], fileList[0].name);

  //       console.log(res);

  //       setImgUrl(res.location);
  //       /*
  //        * {
  //        *   Response: {
  //        *     bucket: "bucket-name",
  //        *     key: "directory-name/filename-to-be-uploaded",
  //        *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
  //        *   }
  //        * }
  //        */
  //     } catch (exception) {
  //       console.log(exception);
  //       /* handle the exception */
  //     }
  //   } else {
  //     console.log("file cannot be null");
  //   }
  // }

  // function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
  //   setSelectedFile(event.currentTarget.files);
  //   // console.log(event.currentTarget.files);
  // }
  return (
    <div className="landing-container1">
      <HomeScreenNavbar />
      <h2 className="card-header">สมัครเป็นคน โคตรว่าง</h2>
      <h2 className="card-header">เพื่อหารายได้ในตอนที่คุณโคตรว่างจริงๆ</h2>
      <div className="registerButton">
        <button
          onClick={() => {
            //login
          }}
        >
          สมัครเลย!
        </button>
        {/* <div>React S3 File Upload</div>
        <input type="file" onChange={handleChangeFile} />
        <button onClick={() => uploadFileToS3(selectedFile)}>
          {" "}
          Upload to S3
        </button> */}
      </div>
      {/* <img src={imgUrl} alt={"img not found"} /> */}
    </div>
  );
};

export default HomeScreen;
