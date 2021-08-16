import React, { useEffect, useState } from "react";

import s from "./Assets.module.scss";
import axios from "axios";

//components
import DataTable from "../../components/DataTable/DataTable";
import Pagination from "../../components/Pagination/Pagination";

const Assets = () => {
  const [loading, setLoading] = useState(false);
  const [assetList, setAssetList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageState, setPageState] = useState({ currentPage: 0, totalPages: 0 });

  useEffect(() => {
    fetchAssetList();
  }, [currentPage]);

  const fetchAssetList = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://dev-inventory.singlewindow.io/v1/api/invertories", {
        params: {
          page: currentPage,
          size: 10,
          sortBy: "cdate",
        },
      });
      if (res.data) {
        setAssetList(res.data.content);
        debugger;
        console.log(res.data.totalPages);
        setPageState({
          currentPage: res.data.pageable.pageNumber,
          totalPages: res.data.totalPages,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("pageState: ", pageState);

  const columns = [
    {
      name: "Ürün",
      id: "product",
    },
    {
      name: "Seri No",
      id: "serialNumber",
    },
    {
      name: "Kategori",
      id: "category",
    },
    {
      name: "Kullanıcı",
      id: "user",
    },
    {
      name: "Garanti",
      id: "guarantee",
    },
    {
      name: "Durum",
      id: "status",
    },
  ];

  const handleRowActions = async (type, id) => {
    if (type === "delete") {
      console.log(id, "id'li item silindi!!");
      try {
        await axios.delete(`https://dev-inventory.singlewindow.io/v1/api/invertories/${id}`);
        fetchAssetList();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div id="assets-container" className={s.assetsContainer}>
      <DataTable
        data={assetList}
        columns={columns}
        title={"Tüm Varlıklar"}
        loading={loading}
        customToolbar={[
          {
            id: "addAssets",
            type: "Link",
            text: "Varlık Ekle",
            path: "/assets/create",
          },
        ]}
        onRowAction={(type, rowId) => handleRowActions(type, rowId)}
        onBatchAction={(type, items) => console.log(type, items)}
      />
      <Pagination
        className={s.pagination}
        currentPage={pageState.currentPage}
        totalPages={pageState.totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Assets;
