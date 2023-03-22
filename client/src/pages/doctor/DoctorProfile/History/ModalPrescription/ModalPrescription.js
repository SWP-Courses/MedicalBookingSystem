import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalPrescription.scss";

function ModalPrescription(props) {
  const { modalShow, setModalShow, listPrescription } = props;

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        className="modal-prescription"
      >
        <Modal.Body>
          <div className="prescription-info">
            <div className="prescription-info__disease">
              <h5>Bệnh</h5>
              <textarea className="shadow bg-body-tertiary rounded p-1"  value={listPrescription?.disease} />
            </div>
            <div className="prescription-info__note mt-3">
              <h5>Lưu ý</h5>
              <textarea className="shadow bg-body-tertiary rounded rounded p-1" value={listPrescription?.note} />
            </div>
          </div>
          <center>
            <table className="mt-3">
              <thead>
                <tr>
                  <th>Tên thuốc</th>
                  <th>Loại</th>
                  <th>Số lượng</th>
                  <th>Liều dùng</th>
                </tr>
              </thead>
              <tbody>
                {listPrescription?.medicines?.map((item) => {
                  return (
                    <tr key={item?.medicine_id?._id} style={{ height: "10px" }}>
                      <td>{item?.medicine_id?.name}</td>
                      <td>{item?.medicine_id?.type}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.dose}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>đóng</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalPrescription;
