import React from 'react';
import Modal from "../../../components/UI/Modal";



const DeleteCategoriesModal = (props) => {

    const {
     modalTitle,
     show,
     handleClose,
     buttons,
     expandedArray,
     checkedArray,
     deleteCategories
    } = props;
    
    return (
      <Modal
        modalTitle={modalTitle}
        show={show}
        handleClose={handleClose}
        handleHide={handleClose}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: handleClose
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories
          },
        ]}
      >

        <h5>Checked Categories</h5>
        {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
      </Modal>
    );
  };

  export default DeleteCategoriesModal;