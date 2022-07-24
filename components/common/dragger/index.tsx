import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import React from "react";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { Controller } from "react-hook-form";
import { Icon } from "components/icon";
import { Icons } from "consts";
import { Typography } from "../typography";
import { isEmpty } from "lodash";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  // onChange(info) {
  //   const { status } = info.file;
  //   if (status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
export interface AlertProps {
  // color: "success" | "danger";
  // message?: string;
  // customIcon?: string;
  maxFiles: number;
  rules: any;
  error: any;
  control: any;
  register: any;
  name: string;
  setValueRHF: any;
  setErrorRHF: any;
  defaultValues?: any;
  fileList: any;
  setFileList: any;
  isEdit?: boolean;
  disabled?: boolean;
}

/**
 * Use to notificate the user something happened
 */
export const DragAndDrop: React.FC<AlertProps> = ({
  // message,
  // customIcon,
  maxFiles,
  // children,
  // color,
  setValueRHF,
  disabled,
  name,
  error,
  setErrorRHF,
  register,
  isEdit,
  defaultValues,
  rules,
  control,
  fileList,
  setFileList,
}) => {
  // const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [fileListBase64, setFileListBase64] = React.useState<any>();
  const [loadingFiles, setLoadingFiles] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const beforeUpload = (file: any) => {
    if (fileList.length >= 3) {
      message.error("Solo puede subir 3 archivos");
      return Upload.LIST_IGNORE;
    }

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 <= 2;

    if (!isLt2M) {
      message.error("La imagen debe ser menor o igual a 2 MB!");
      return Upload.LIST_IGNORE;
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = ({
    fileList: newFileList,
    ...rest
  }) => {
    console.log("status", rest);
    console.log("ELLLLL", newFileList.slice());

    // if (rest.file.status === "uploading") {
    //   setFileList(newFileList);
    //   //  setLoading(true);
    //   return;
    // }

    // console.log("el resto", rest);
    // if (rest.file.status === "done") {
    setLoadingFiles(true);
    // console.log("los file", newFileList);
    // console.log("los file legth", newFileList.length);
    const aux: any = [];
    const filesNumber = newFileList.length;
    // console.log("la cantidad:", filesNumber);
    newFileList.map(async (file: any, index) => {
      // console.log("diooooos", file);

      if (file.status === "done") {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as RcFile);
          // file.preview = URL.createObjectURL(file.originFileObj);
        }

        aux.push(file.url || (file.preview as string));

        if (filesNumber < maxFiles) {
          // console.log("debe ser mayor a", maxFiles);
          // setErrorRHF(name, {
          //   type: "custom",
          //   message: `Debe subir ${maxFiles} archivos`,
          // });
          setValueRHF(name, aux);
        } else {
          setFileListBase64(aux.slice());
          setValueRHF(name, aux, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }

      if (file.status === "done") {
        if (index === newFileList.length - 1) {
          setLoadingFiles(false);
        }
      }
    });
    if (filesNumber < maxFiles) {
      console.log("debe ser mayor a", maxFiles);
      setErrorRHF(name, {
        type: "custom",
        message: `Debe subir ${maxFiles} archivos`,
      });
    }

    // console.log("Elaux:", aux);
    setFileList(newFileList);
    // }
  };

  React.useEffect(() => {
    console.log("en base 64:", fileListBase64);
  }, [fileListBase64]);

  // React.useEffect(() => {
  //   console.log("los files:", fileList);
  // }, [fileList]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={fileList}
      rules={rules} //optional
      render={({
        field: { onChange },
        fieldState: { invalid, isDirty }, //optional
        formState: { errors: error }, //optional, but necessary if you want to show an error message
      }) => (
        <>
          <Dragger
            {...props}
            onChange={handleChange}
            fileList={fileList}
            maxCount={maxFiles}
            disabled={disabled}
            showUploadList={!loadingFiles}
            accept=".jpg,.jpeg,.png"
            beforeUpload={beforeUpload}
            // showUploadList={isEdit ? false : true}
            // disabled={fileList.length >= 3}

            // onPreview={handlePreview}
          >
            {fileList.length > 0 ? (
              <>
                {fileListBase64 && (
                  <div className="p-4 flex flex-wrap gap-4">
                    {fileListBase64.map((item: any, index: any) => {
                      return (
                        <img
                          key={index}
                          src={typeof item === "object" ? item.preview : item}
                          className="w-20 h-20 object-cover "
                          alt=""
                        />
                      );
                    })}
                  </div>
                )}
                {fileList && !fileListBase64 && (
                  <div className="p-4 flex flex-wrap gap-4">
                    {fileList.map((item: any, index: any) => {
                      return (
                        <img
                          key={index}
                          src={item.preview}
                          className="w-20 h-20 object-cover "
                          alt=""
                        />
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Haga clic o arrastre el archivo a esta área para cargarlo
                </p>
              </>
            )}
            {/* {console.log("LOS ERRR", errors)} */}
          </Dragger>

          {error && error[name]?.message && (
            <span className="flex items-center mt-3 text-alert-error font-montserrat">
              <div className="mr-1 w-4 h-3">
                <Icon
                  src={Icons.exclamation}
                  fillPath
                  className="text-alert-error"
                />
              </div>
              <Typography type="caption" className="f-12">
                {error[name]?.message}
              </Typography>
            </span>
          )}
        </>
      )}
    />
  );
};
