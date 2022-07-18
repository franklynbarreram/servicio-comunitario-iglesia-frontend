import * as React from "react";
import { Typography } from "components/common/typography";
import clsx from "clsx";
import { formatDates, ValidateImage, ValidateString } from "lib/helper";
import { IconWithText } from "components/icon-with-text";
import { Table } from "antd";
import moment from "moment";
import { isEmpty } from "lodash";

const ViewAllOnlyMiembros = ({ data, hide, refetch }: any) => {
  console.log("detalle all miembros per club", data);
  const { cedula, nombre, periodo, cargo, foto, activo } = data;

  const columnsPeriodos = [
    {
      title: "Cargo",
      dataIndex: "cargo",
      key: "cargo",
    },

    {
      title: "Fecha inicio",
      dataIndex: "",
      key: "",
      render: (value: any) => moment(value.fecha_inicio).format(formatDates),
    },
    {
      title: "Fecha inicio",
      dataIndex: "",
      key: "",
      render: (value: any) =>
        value?.fecha_fin ? moment(value.fecha_fin).format(formatDates) : "N/A",
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Detalle de Miembro</h2>
      <div className="item flex flex-col gap-2 text-center justify-center mt-8">
        <img
          src={ValidateImage(foto)}
          alt=""
          className="w-28 h-28 mx-auto object-cover object-center rounded-full"
        />
        <Typography
          type="label"
          className={clsx("ml-3 font-bold mb-2 block text-yellow text-xl")}
        >
          {nombre}
        </Typography>
      </div>
      <div className="container-form mt-8 gap-6 grid grid-cols-3 text-left">
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Nombre
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {ValidateString(nombre)}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Cédula
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {cedula}
          </Typography>
        </div>

        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Cargo
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {cargo}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Status
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {activo ? (
              <span className="font-bold text-secondary">Activo</span>
            ) : (
              <span className="font-bold text-alert-error">Inactivo</span>
            )}
          </Typography>
        </div>
      </div>
      {!isEmpty(data?.periodos) && (
        <div className="mt-8">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Periodos
          </Typography>
          <Table
            className="table_club_miembros table_ant_custom shadow-md overflow-x-auto border-b border-gray-200 rounded-lg"
            columns={columnsPeriodos}
            dataSource={data?.periodos}
            pagination={false}
            rowKey="periodos"
          />
        </div>
      )}
    </div>
  );
};

export default ViewAllOnlyMiembros;
