import React from 'react';

export default function PageBanner({ title }) {
  return (
    <section className="page-banner-wrap text-center bg-cover">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="page-heading text-white">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
