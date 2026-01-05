import React, { useState } from 'react';
import useHospitalRegistrationStore from '../../../../store/useHospitalRegistrationStore';
import {
  FormFieldRow,
  RegistrationHeader,
  ProgressBar
} from '../../../../components/FormItems';
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';
import CustomUpload from '../Doctor_registration/CustomUpload';
import RadioButton from '../../../../components/GeneralDrawer/RadioButton';

const Hos_4 = () => {
  const {
    gstin,
    hasCin,
    cinNumber,
    stateHealthReg,
    panCard,
    rohiniId,
    nabhAccreditation,
    setField,
    setDocument,
  } = useHospitalRegistrationStore();

  const handleInputChange = (field, value) => {
    setField(field, value);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Documents Verification"
        subtitle="Provide your Document Numbers and Upload Supporting Document for verification"
      >
        
      </RegistrationHeader>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[700px] mx-auto space-y-4">

          {/* GSTIN Section */}
          <FormFieldRow>
            {/* Left Col: GSTIN Input + Fetched Data */}
            <div className="w-full flex flex-col gap-3">
              <div className="relative">
                <InputWithMeta
                  label="GSTIN"
                  infoIcon
                  requiredDot
                  placeholder="Enter 15-digit GSTIN"
                  value={gstin || ''}
                  onChange={(v) => handleInputChange('gstin', v)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-[31px] text-xs bg-secondary-grey50 px-[6px] py-[1px] rounded-sm text-secondary-grey300 hover:text-blue-primary250 transition-colors"
                >
                  Verify
                </button>
              </div>

             
            </div>

            {/* Right Col: Upload */}
            <div className="w-full">
              <CustomUpload
                label="Upload Proof"
                noView={false}
                uploadContent="Upload File"
                onUpload={(key) => setDocument({ type: 'GST', no: gstin || '', url: key })}
                meta="Support Size upto 5MB in .pdf, .jpg, .doc"
              />
            </div>
          </FormFieldRow>

           {/* Fetched Details Box */}
              <div className="border flex flex-col gap-2 border-secondary-grey150/60 rounded-lg p-3 bg-white ">
                <p className="text-sm font-semibold text-secondary-grey400">Fetched Details from GSTIN</p>
                <div className=" text-sm text-secondary-grey200 flex flex-col gap-1.5">
                  <p>Legal Business Name :</p>
                  <p>Registered Address :</p>
                  <p>Status :</p>
                </div>
              </div>

          {/* Other Documents List */}
          <div className="space-y-4">
            {/* State Health Reg */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="State Health Registration Number"
                  requiredDot
                  placeholder="Enter State Registration Number"
                  value={stateHealthReg || ''}
                  onChange={(v) => handleInputChange('stateHealthReg', v)}
                />
              </div>
              <div className="w-full">
                <CustomUpload
                  label="Upload Proof"
                  uploadContent="Upload File"
                  noView={false}
                  onUpload={(key) => setDocument({ type: 'State Health Reg No', no: stateHealthReg || '', url: key })}
                  meta="Support Size upto 5MB in .pdf, .jpg, .doc"
                />
              </div>
            </FormFieldRow>

            {/* PAN Card */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="PAN Card of Hospital"
                  requiredDot
                  placeholder="Enter State Registration Number" // Placeholder matched image text if visible, or generic
                  value={panCard || ''}
                  onChange={(v) => handleInputChange('panCard', v)}
                />
              </div>
              <div className="w-full">
                <CustomUpload
                  label="Upload Proof"
                  noView={false}
                  uploadContent="Upload File"
                  onUpload={(key) => setDocument({ type: 'Pan Card', no: panCard || '', url: key })}
                  meta="Support Size upto 5MB in .pdf, .jpg, .doc"
                />
              </div>
            </FormFieldRow>

            {/* Rohini ID */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Rohini ID"
                  placeholder="Enter 13-digit Rohini ID"
                  value={rohiniId || ''}
                  onChange={(v) => handleInputChange('rohiniId', v)}
                />
              </div>
              <div className="w-full">
                <CustomUpload
                  label="Upload Proof"
                  noView={false}
                  uploadContent="Upload File"
                  onUpload={(key) => setDocument({ type: 'Rohini ID', no: rohiniId || '', url: key })}
                  meta="Support Size upto 5MB in .pdf, .jpg, .doc"
                />
              </div>
            </FormFieldRow>

            {/* NABH Accreditation */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="NABH Accreditation"
                  placeholder="Enter NABH Accreditation ID"
                  value={nabhAccreditation || ''}
                  onChange={(v) => handleInputChange('nabhAccreditation', v)}
                />
              </div>
              <div className="w-full">
                <CustomUpload
                  label="Upload Proof"
                  noView={false}
                  uploadContent="Upload File"
                  onUpload={(key) => setDocument({ type: 'NABH', no: nabhAccreditation || '', url: key })}
                  meta="Support Size upto 5MB in .pdf, .jpg, .doc"
                />
              </div>
            </FormFieldRow>
          </div>

          <div className="border-t border-secondary-grey200/20"></div>

          {/* CIN Question */}
          <div className="flex items-center justify-between py-">
            <p className="text-sm text-secondary-grey400 ">Do you have CIN (Corporate Hospital Registration Number)?</p>
            <div className="flex gap-4 ">
              <RadioButton
                name="hasCin"
                value="yes"
                label="Yes"
                checked={hasCin === 'yes'}
                onChange={() => setField('hasCin', 'yes')}
              />
              <RadioButton
                name="hasCin"
                value="no"
                label="No"
                checked={hasCin === 'no'}
                onChange={() => setField('hasCin', 'no')}
              />
            </div>
          </div>

          {hasCin === 'yes' && (
            <div className="">
              <InputWithMeta
                label="CIN Number"
                placeholder="Enter CIN Number"
                value={cinNumber || ''}
                onChange={(v) => handleInputChange('cinNumber', v)}
              />
            </div>
          )}

          <div className='pb-4'></div>
        </div>
      </div>
    </div>
  );
};

export default Hos_4;
