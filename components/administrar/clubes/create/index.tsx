import { Input } from "components/common/form/input";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import AsyncSelect from "react-select/async";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "components/common/button/button";
// import { useQuery } from "react-query";
// import { UseQueryEnums } from "consts/useQueryEnums";
import { ConsejosRegionalesServices, PersonasServices } from "services";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "components/common/typography";
import clsx from "clsx";
import { GenerateErrorToast } from "lib/helper";
import { isNil, isEmpty } from "lodash";
import { PastoresService } from "services/Pastores";
import { IglesiasServices } from "services/Iglesias";
import { customStyles } from "consts/stylesReactSelect.helper";
import { DirectorService } from "services/Director";
import { InputList } from "components/common/form/input-list";
import { InputListSearch } from "components/common/form/input-list-search";
import { OptionType } from "interfaces";
import { ClubesServices } from "services/Clubes";
import { Icons } from "consts";
import { Icon } from "components/icon";
import { optionsType } from "consts/typesSelects";

const CreateClub = ({ hide, refetch }: any) => {
  const [selectValueDirector, setSelectValueDirector] =
    React.useState<{ value: Number; label: string }>();
  const [selectValueIglesias, setSelectValueIglesias] =
    React.useState<{ value: Number; label: string }>();
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();
  const [dataDirector, setDataDirector] = React.useState<any>();
  const [dataIglesias, setDataIglesias] = React.useState<any>();
  // const { data: presidentesConsejo, isLoading } = useQuery<any>(
  //   [UseQueryEnums.GET_PRESIDENTES_CONSEJO],
  //   () => ConsejosRegionalesServices.getAllPastores()
  // );

  // console.log("presiii", presidentesConsejo);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: { redes: [{ name: "", url: "" }] },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "redes",
    }
  );

  const rules = {
    name: {
      required: { value: true, message: "This is required" },
    },
    lema: {
      required: { value: true, message: "This is required" },
    },
    // blanco_estudios: {
    //   required: { value: true, message: "This is required" },
    // },
    direccion: {
      required: { value: true, message: "This is required" },
    },
    tipo: {
      required: { value: true, message: "This is required" },
    },
    redes: {
      required: { value: true, message: "This is required" },
    },
    redesUrl: {
      required: { value: true, message: "This is required" },

      pattern: {
        value:
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        message: "URL invalida",
      },
    },
  };

  const handleSubmitData = (data: any) => {
    const FinalData = {
      nombre: data?.name,
      logo: imageUrl,
      lema: data.lema,
      direccion: data.direccion,
      // blanco_estudios_biblicos: data.blanco_estudios,
      id_iglesia: selectValueIglesias?.value,
      cedula_director: selectValueDirector?.value,
      tipo: data.tipo.value,
      redes: data?.redes,
    };

    console.log("FinalData", FinalData);
    setIsLoading(true);

    ClubesServices.create(FinalData)
      .then((response: any) => {
        addToast("Club creado exitosamente", {
          appearance: "success",
        });
        console.log("response create:", response);
        refetch();
        hide();
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log("Error: ", e);
        GenerateErrorToast(e, addToast);
        setIsLoading(false);
      });
  };
  const handleChangeSelectDirector = (selected: any) => {
    setSelectValueDirector(selected);
  };
  const handleChangeSelectConsejosIglesias = (selected: any) => {
    setSelectValueIglesias(selected);
  };
  React.useEffect(() => {
    console.log("cambia", selectValueDirector);
  }, [selectValueDirector]);

  const promiseOptionsDirector = (inputValue: any, callback: any) => {
    if (!inputValue && !dataDirector) {
      return DirectorService.getAll({
        id_club: 0,
      }).then((response) => {
        setDataDirector(response);
        const options = response?.data?.map((item: any) => {
          return {
            value: item.cedula,
            label: `${item.nombres} ${item.apellidos}`,
          };
        });
        return options;
      });
    } else {
      let filter = dataDirector?.data?.filter((item: any) =>
        item.nombres.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (isEmpty(filter) || isNil(filter)) {
        filter = dataDirector?.data?.filter((item: any) =>
          item.apellidos.toLowerCase().includes(inputValue.toLowerCase())
        );
      }

      const options = filter?.map((item: any) => {
        return {
          value: item.cedula,
          label: `${item.nombres} ${item.apellidos}`,
        };
      });
      return callback(options);
    }
  };

  const promiseOptionsIglesias = (inputValue: any, callback: any) => {
    if (!inputValue && !dataIglesias) {
      return IglesiasServices.getAll().then((response) => {
        setDataIglesias(response);
        const options = response?.data?.map((item: any) => {
          return { value: item.id, label: item.nombre };
        });
        return options;
      });
    } else {
      const filter = dataIglesias?.data?.filter((item: any) =>
        item.nombre.toLowerCase().includes(inputValue.toLowerCase())
      );

      const options = filter?.map((item: any) => {
        return { value: item.id, label: item.nombre };
      });
      return callback(options);
    }
  };

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Crear Club</h2>
      <div className="container-form mt-5 text-left">
        {isLoading ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <Input
              name="name"
              title="Nombre"
              labelVisible
              isFill={!!watch("name")}
              register={register}
              rules={rules.name}
              error={errors.name}
              className="mb-3 md:mb-5"
              otherStyles="pt-3 pb-3 rounded-full text-sm"
            />

            <Input
              name="direccion"
              title="Direccion"
              labelVisible
              isFill={!!watch("direccion")}
              register={register}
              rules={rules.direccion}
              error={errors.direccion}
              className="mb-3 md:mb-5"
              otherStyles="pt-3 pb-3 rounded-full text-sm"
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <Input
                  name="lema"
                  title="Lema"
                  labelVisible
                  isFill={!!watch("lema")}
                  register={register}
                  rules={rules.lema}
                  error={errors.lema}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
              {/* <div className="col-span-1">
                <Input
                  name="blanco_estudios"
                  title="Blanco Estudios Biblicos"
                  labelVisible
                  isFill={!!watch("blanco_estudios")}
                  register={register}
                  rules={rules.blanco_estudios}
                  error={errors.blanco_estudios}
                  className="mb-3 md:mb-5"
                  type="number"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div> */}
            </div>

            <InputListSearch
              // myDefaultValue={myDefaultValue}
              name="tipo"
              title="Tipo"
              className="mb-4"
              options={optionsType}
              register={register}
              // rules={selectRules}
              // error={selectError}
              // isFill={selectIsFill}
              // handleChange={handleChange}
              rules={rules.tipo}
              error={errors.tipo}
              handleChange={(data: OptionType) =>
                setValue("tipo", data, { shouldValidate: true })
              }
              // myDefaultValue={watch("tipo")}
              // onChangeCustom={(event: any) => {
              //   console.log("siiuuuu", event.target.value);
              //   setValue("tipo", event.target.value);
              // }}
            />

            <div className={"relative py-2 w-full mb-3 md:mb-5"}>
              <p className={"ml-3 font-normal mb-2 block f-18"}>Iglesia</p>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseOptionsIglesias}
                styles={customStyles}
                value={selectValueIglesias}
                className={"text-sm"}
                onChange={handleChangeSelectConsejosIglesias}
              />
            </div>
            <div className={"relative py-2 w-full mb-3 md:mb-5"}>
              <p className={"ml-3 font-normal mb-2 block f-18"}>Director</p>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseOptionsDirector}
                styles={customStyles}
                value={selectValueDirector}
                className={"text-sm"}
                onChange={handleChangeSelectDirector}
              />
            </div>
            <div className="border-2 border-yellow mt-7 py-4 px-2 rounded-md mb-4">
              <Typography
                type="label"
                className={clsx(
                  "ml-3 font-bold mb-2 block text-xl text-center"
                )}
              >
                Redes
              </Typography>
              {fields.map((item, index) => {
                return (
                  <div key={item.id} className="flex gap-3 items-center">
                    {/* <input
                    name={`test[${index}].firstName`}
                    defaultValue={`${item.firstName}`} // make sure to set up defaultValue
                    ref={register()}
                  /> */}

                    <Input
                      name={`redes[${index}].name`}
                      title="Nombre"
                      labelVisible
                      // isFill={!!watch(`redes[${index}].name`)}
                      register={register}
                      rules={rules.redes}
                      error={errors.redes?.[index]?.name}
                      className="mb-3 md:mb-5"
                      otherStyles="pt-3 pb-3 rounded-full text-sm"
                    />
                    <Input
                      name={`redes[${index}].url`}
                      title="URL"
                      labelVisible
                      // isFill={!!watch(`redes[${index}].url`)}
                      register={register}
                      rules={rules.redesUrl}
                      error={errors.redes?.[index]?.url}
                      className="mb-3 md:mb-5"
                      otherStyles="pt-3 pb-3 rounded-full text-sm"
                    />
                    <button
                      type="button"
                      className={clsx({
                        "cursor-not-allowed pointer-events-none":
                          fields.length === 1,
                      })}
                      onClick={() => {
                        if (fields.length > 1) remove(index);
                      }}
                    >
                      <img
                        src={Icons.iconTrash}
                        className={clsx(
                          {
                            "cursor-not-allowed pointer-events-none":
                              fields.length === 1,
                          },
                          "w-16 mt-2"
                        )}
                        alt=""
                      />
                    </button>
                  </div>
                );
              })}
              <div className="text-center">
                <button
                  type="button"
                  className="text-gray-800 text-sm font-bold text-center"
                  onClick={() => {
                    append({ name: "", url: "" });
                  }}
                >
                  {`+ Agregar red`}
                </button>
              </div>
            </div>
            <div className="flex-auto">
              <Typography
                type="label"
                className={clsx("ml-3 font-normal mb-2 block f-18")}
              >
                Icon
              </Typography>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-10 px-4 md:px-20">
              <Button
                labelProps="f-18 font-normal"
                label={"Cancelar"}
                // loading={isLoading}
                boderRadius="rounded-full"
                size="full"
                type="button"
                sizesButton="py-3"
                onClick={hide}
                // disabled={!isDirty || !isValid || !!isLoading}
              />
              <Button
                labelProps="f-18 font-normal"
                label={"Crear"}
                fill
                // loading={isLoading}
                boderRadius="rounded-full"
                size="full"
                type="submit"
                sizesButton="py-3"
                // disabled={
                //   !isDirty ||
                //   !isValid ||
                //   !!isLoading ||
                //   isEmpty(selectValueDirector?.label) ||
                //   isNil(selectValueDirector?.label) ||
                //   isNil(selectValueDirector) ||
                //   isEmpty(selectValueIglesias?.label) ||
                //   isNil(selectValueIglesias?.label) ||
                //   isNil(selectValueIglesias)
                //   // isEmpty(imageUrl) ||
                //   // isNil(imageUrl)
                // }
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateClub;
