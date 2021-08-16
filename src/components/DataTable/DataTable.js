import React, { useState } from "react";
import s from "./DataTable.module.scss";

//components
import Card from "../Card/Card";

import { Link } from "react-router-dom";

const DataTable = ({
  data,
  columns,
  title,
  loading,
  customToolbar,
  onRowAction,
  onBatchAction,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckbox = (isChecked, assetId) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, assetId]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== assetId));
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedItems([...data.map((asset) => asset.id)]);
    } else {
      setSelectedItems([]);
    }
  };

  console.log("selectedItems: ", selectedItems);
  console.log("data: ", data);

  return (
    <>
      <div id="assets-toolbar" className={s.toolbar}>
        {customToolbar.map((tool) => {
          if (tool.type === "Link") {
            return (
              <Link key={tool.id} id={tool.id} to={tool.path}>
                {tool.text}
              </Link>
            );
          } else if (tool.type === "button") {
            return (
              <button id={tool.id} key={tool.id} onClick={tool.onclick}>
                {tool.text}
              </button>
            );
          } else return null;
        })}
        <button onClick={() => onBatchAction("download", [])}>İndir</button>
        <button onClick={() => onBatchAction("delete", [])}>Sil</button>
        <button onClick={() => onBatchAction("print", [])}>Yazdır</button>
      </div>
      <Card title={title}>
        <table id="dataTable" className={s.table}>
          <thead>
            <tr>
              <th className={s.selectAllTableHead}>
                <input
                  checked={data.length === selectedItems.length}
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              {columns.map((column) => (
                <th id={column.id} key={column.id}>
                  {column.name}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : !loading && data.length === 0 ? (
              <tr>
                <td>Varlık bulunamadı.</td>
              </tr>
            ) : (
              <>
                {data.map((asset) => (
                  <tr key={asset.id} className={selectedItems.includes(asset.id) && s.selected}>
                    <td>
                      <input
                        className={s.selectCheckbox}
                        onChange={(e) => handleCheckbox(e.target.checked, asset.id)}
                        checked={selectedItems.includes(asset.id)}
                        type="checkbox"
                      />
                    </td>
                    <td>{asset.name}</td>
                    <td>{asset.serialNumber}</td>
                    <td>{asset.categoryType.name}</td>
                    <td></td>
                    <td></td>
                    <td>{asset.status}</td>
                    <td>
                      <button
                        className={s.tableActionButtons}
                        onClick={() => onRowAction("delete", asset.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default DataTable;
