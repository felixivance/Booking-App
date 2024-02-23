import React from 'react'

const UpdateAvatar = () => {
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          action="/submit-avatar-upload"
          method="POST"
        >
          <h2 className="mb-4">Upload Avatar</h2>

          <div className="form-group">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <figure className="avatar item-rtl">
                  <img src="" className="rounded-circle" alt="image" />
                </figure>
              </div>
              <div className="input-foam">
                <label className="form-label" html-for="customFile">
                  Choose Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="form-control"
                  id="customFile"
                  accept="images/*"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn form-btn w-100 py-2">Upload</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateAvatar