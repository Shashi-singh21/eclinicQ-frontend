import React from "react";
import { Info } from "lucide-react";
import useHospitalRegistrationStore from '../../../../store/useHospitalRegistrationStore';
import { 
  Input,
  Radio,
  Upload,
  FormContainer,
  FormSection,
  FormFieldRow
} from "../../../../components/FormItems";

const Hos_4 = () => {
  const {
    gstin,
    abhaId,
    hasCin,
    cinNumber,
    stateHealthReg,
    panCard,
    rohiniId,
    nabhAccreditation,
    documents,
    setField,
    setDocument,
    setDocuments
  } = useHospitalRegistrationStore();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setField(name, type === 'radio' ? value : value);
  };

  return (
    <FormContainer>
      <FormSection
        title="Documents Verification"
        subtitle="Provide your Document Numbers and Upload Supporting Document for verification"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Warning Banner */}
          <div className="bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-lg flex items-start gap-2">
            <Info className="w-5 h-5 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold">Automated Verification ID</span>
              <br />
              We'll instantly verify the following IDs through their respective APIs. At least one verified ID is required to proceed.
            </p>
          </div>

          {/* GSTIN & ABHA Row */}
          <FormFieldRow>
            {/* GSTIN */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    label="GSTIN"
                    name="gstin"
                    placeholder="Enter 15-digit GSTIN"
                    value={gstin || ''}
                    onChange={handleInputChange}
                    compulsory={true}
                    required={true}
                  />
                </div>
                <div className="flex items-end">
                  <button className="px-4 py-1 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200">
                    Verify
                  </button>
                </div>
              </div>
              <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
                <p className="font-medium mb-1">Fetched Details from GSTIN</p>
                <p>Legal Business Name :</p>
                <p>Registered Address :</p>
                <p>Status :</p>
              </div>
              <Upload 
                label="Upload GSTIN Document"
                onUpload={(key) => setDocument({ type: 'GST', no: gstin || '', url: key })}
              />
            </div>

            {/* ABHA */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    label="ABHA Facility ID"
                    name="abhaId"
                    placeholder="Enter Abha ID"
                    value={abhaId || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-end">
                  <button className="px-4 py-1 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200 ">
                    Verify
                  </button>
                </div>
              </div>
              <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
                <p className="font-medium mb-1">Fetched Details from ABHA</p>
                <p>Legal Business Name :</p>
                <p>Registered Address :</p>
                <p>Status :</p>
              </div>
              <Upload 
                label="Upload ABHA Facility Proof"
                onUpload={(key) => setDocument({ type: 'ABHA', no: abhaId || '', url: key })}
              />
            </div>
          </FormFieldRow>

          {/* CIN Question */}
          <div className="space-y-3">
            <Radio
              label="Do you have CIN (Corporate Hospital Registration Number)?"
              name="hasCin"
              value={hasCin}
              onChange={handleInputChange}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
            />
            {hasCin === 'yes' && (
              <div>
                <Input
                  label="CIN Number"
                  name="cinNumber"
                  placeholder="Enter CIN Number"
                  value={cinNumber || ''}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="border" />

          {/* Other Documents */}
          <div className="space-y-4">
            {[
              {
                name: "stateHealthReg",
                label: "State Health Registration Number",
                required: true,
                placeholder: "Enter State Registration Number",
              },
              {
                name: "panCard",
                label: "PAN Card of Hospital",
                required: true,
                placeholder: "Enter PAN Number",
              },
              {
                name: "rohiniId",
                label: "Rohini ID",
                placeholder: "Enter 13-digit Rohini ID",
              },
              {
                name: "nabhAccreditation",
                label: "NABH Accreditation",
                placeholder: "Enter NABH Accreditation ID",
              },
            ].map((field, i) => (
              <FormFieldRow key={i}>
                <div className="space-y-3">
                  <Input
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={(() => {
                      switch(field.name) {
                        case 'stateHealthReg': return stateHealthReg || '';
                        case 'panCard': return panCard || '';
                        case 'rohiniId': return rohiniId || '';
                        case 'nabhAccreditation': return nabhAccreditation || '';
                        default: return '';
                      }
                    })()}
                    onChange={handleInputChange}
                    compulsory={field.required}
                    required={field.required}
                  />
                  <p className="text-xs text-gray-500">
                    Upload Supporting Document of Size 4MB in .pdf format
                  </p>
                </div>
                <div className="flex items-start ">
                  <Upload 
                    label="Upload File" 
                    className="w-full"
                    onUpload={(key) => {
                      const map = {
                        stateHealthReg: { type: 'State Health Reg No', no: stateHealthReg || '' },
                        panCard: { type: 'Pan Card', no: panCard || '' },
                        rohiniId: { type: 'Rohini ID', no: rohiniId || '' },
                        nabhAccreditation: { type: 'NABH', no: nabhAccreditation || '' },
                      };
                      const meta = map[field.name];
                      if (meta) setDocument({ ...meta, url: key });
                    }}
                  />
                </div>
              </FormFieldRow>
            ))}
          </div>
        </div>
      </FormSection>
    </FormContainer>
  );
};

export default Hos_4;
