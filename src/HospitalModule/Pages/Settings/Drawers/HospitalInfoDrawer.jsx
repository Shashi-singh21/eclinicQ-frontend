
import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import RichTextBox from "@/components/GeneralDrawer/RichTextBox";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import RadioButton from "@/components/GeneralDrawer/RadioButton";
import { ChevronDown, Calendar, CheckCircle2 } from "lucide-react";
import MapLocation from "@/components/FormItems/MapLocation";
import useImageUploadStore from "@/store/useImageUploadStore";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import calendarWhite from "/Doctor_module/sidebar/calendar_white.png";
const upload = '/Doctor_module/settings/upload.png'

export default function HospitalInfoDrawer({ open, onClose, onSave, initial = {} }) {
    // Hospital Info State
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [establishmentDate, setEstablishmentDate] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [emergencyPhone, setEmergencyPhone] = useState("");
    const [beds, setBeds] = useState("");
    const [icuBeds, setIcuBeds] = useState("");
    const [ambulances, setAmbulances] = useState("");
    const [ambulancePhone, setAmbulancePhone] = useState("");
    const [bloodBank, setBloodBank] = useState("No"); // Yes / No
    const [bloodBankPhone, setBloodBankPhone] = useState("");
    const [about, setAbout] = useState("");
    const [photos, setPhotos] = useState([]);

    // Address State
    const [blockNo, setBlockNo] = useState("");
    const [areaStreet, setAreaStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latLng, setLatLng] = useState({ lat: null, lng: null });

    // UI State
    const [showEstDateCalendar, setShowEstDateCalendar] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const [stateOpen, setStateOpen] = useState(false);

    const { getUploadUrl, reset } = useImageUploadStore();

    const hospitalTypes = useMemo(() => [
        { label: "Multi-Speciality", value: "Multi-Speciality" },
        { label: "Super-Speciality", value: "Super-Speciality" },
        { label: "General Hospital", value: "General Hospital" },
        { label: "Clinic", value: "Clinic" },
    ], []);

    const cityOptions = useMemo(() => [
        "Akola, Maharashtra",
        "Mumbai, Maharashtra",
        "Pune, Maharashtra",
        "Nagpur, Maharashtra",
        "Nashik, Maharashtra",
    ], []);

    const stateOptions = useMemo(() => ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh", "Goa"], []);

    // Hydrate on open
    useEffect(() => {
        if (!open) return;
        setName(initial?.hospitalName || "");
        setType(initial?.type || "Multi-Speciality");
        setEstablishmentDate(initial?.estDate ? String(initial.estDate).split("T")[0] : "");
        setPhone(initial?.phone || "");
        setEmail(initial?.email || "");
        setWebsite(initial?.website || "");
        setEmergencyPhone(initial?.emergencyPhone || "");
        setBeds(initial?.beds ? String(initial.beds) : "");
        setIcuBeds(initial?.icuBeds ? String(initial.icuBeds) : "");
        setAmbulances(initial?.ambulances ? String(initial.ambulances) : "");
        setAmbulancePhone(initial?.ambulancePhone || "");
        setBloodBank(initial?.bloodBank ? "Yes" : "No");
        setBloodBankPhone(initial?.bloodBankPhone || "");
        setAbout(initial?.about || "");
        setPhotos(Array.isArray(initial?.photos) ? initial.photos : []);

        setBlockNo(initial?.address?.block || "");
        setAreaStreet(initial?.address?.road || "");
        setLandmark(initial?.address?.landmark || "");
        setPincode(initial?.address?.pincode || "");
        setCity(initial?.city || "");
        setState(initial?.state || "Maharashtra");
        setLatLng({
            lat: initial?.latitude ? parseFloat(initial.latitude) : null,
            lng: initial?.longitude ? parseFloat(initial.longitude) : null,
        });
    }, [open, initial]);


    const onUploadPhotos = async (fileList) => {
        if (!fileList || fileList.length === 0) return;
        const files = Array.isArray(fileList) ? fileList : Array.from(fileList);
        const newKeys = [];
        for (const f of files) {
            try {
                const info = await getUploadUrl(f.type, f);
                if (!info?.uploadUrl || !info?.key) continue;
                await fetch(info.uploadUrl, {
                    method: "PUT",
                    headers: { "Content-Type": f.type },
                    body: f,
                });
                newKeys.push(info.key);
            } catch (e) {
                console.error("Photo upload failed", e);
            }
        }
        setPhotos((prev) => [...prev, ...newKeys]);
    };

    const handleSave = () => {
        // Basic validation can be added here
        const data = {
            hospitalName: name,
            type,
            estDate: establishmentDate,
            phone,
            email,
            website,
            emergencyPhone,
            beds,
            icuBeds,
            ambulances,
            ambulancePhone,
            bloodBank: bloodBank === "Yes",
            bloodBankPhone,
            about,
            photos,
            address: {
                block: blockNo,
                road: areaStreet,
                landmark,
                pincode
            },
            city,
            state,
            latitude: latLng.lat,
            longitude: latLng.lng
        }
        onSave?.(data);
        onClose?.();
    }

    return (
        <GeneralDrawer
            isOpen={open}
            onClose={onClose}
            title="Edit Hospital Info"
            primaryActionLabel="Update"
            onPrimaryAction={handleSave}
            width={600}
        >
            <div className="flex flex-col gap-3">
                {/* Hospital Name */}
                <InputWithMeta label="Hospital Name" requiredDot value={name} onChange={setName} placeholder="Manipal Hospital" />

                {/* Type & Est Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                    <div className="relative">
                        <InputWithMeta
                            label="Hospital Type"
                            requiredDot
                            value={type}
                            onChange={() => { }}
                            RightIcon={ChevronDown}
                            onFieldOpen={() => setTypeOpen(!typeOpen)}
                            dropdownOpen={typeOpen}
                            onRequestClose={() => setTypeOpen(false)}
                            readonlyWhenIcon
                            placeholder="Multi-Speciality"
                        />
                        <Dropdown
                            open={typeOpen}
                            onClose={() => setTypeOpen(false)}
                            items={hospitalTypes}
                            selectedValue={type}
                            onSelect={(it) => {
                                setType(it.value);
                                setTypeOpen(false);
                            }}
                            anchorClassName="w-full h-0"
                            className="input-meta-dropdown w-full"
                        />
                    </div>
                    <div className="relative">
                        <InputWithMeta
                            label="Establishment Date"
                            requiredDot
                            value={establishmentDate}
                            onChange={setEstablishmentDate}
                            RightIcon='/Doctor_module/settings/calendar.png'
                            onIconClick={() => setShowEstDateCalendar((v) => !v)}
                            dropdownOpen={showEstDateCalendar}
                            onRequestClose={() => setShowEstDateCalendar(false)}
                            placeholder="09/09/2005"
                        />
                        {showEstDateCalendar && (
                            <div className="shadcn-calendar-dropdown absolute z-[10000] right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
                                <ShadcnCalendar
                                    mode="single"
                                    selected={establishmentDate ? new Date(establishmentDate) : undefined}
                                    onSelect={(date) => {
                                        if (date) {
                                            const year = date.getFullYear();
                                            const month = String(date.getMonth() + 1).padStart(2, "0");
                                            const day = String(date.getDate()).padStart(2, "0");
                                            setEstablishmentDate(`${year}-${month}-${day}`);
                                        }
                                        setShowEstDateCalendar(false);
                                    }}
                                    captionLayout="dropdown"
                                    fromYear={1900}
                                    toYear={new Date().getFullYear()}
                                    className="rounded-lg p-1"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputWithMeta label="Mobile Number" requiredDot value={phone} onChange={setPhone} immutable ImmutableRightIcon={CheckCircle2} placeholder="91753 67487" />
                    <InputWithMeta label="Email" requiredDot value={email} onChange={setEmail} immutable ImmutableRightIcon={CheckCircle2} placeholder="milindchachun.gmail.com" />
                </div>
                <div className="text-[12px] text-secondary-grey200">
                    To Change your Mobile & Email please <span className="text-blue-primary250 cursor-pointer">Call Us</span>
                </div>

                {/* Website & Emergency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputWithMeta label="Website" value={website} onChange={setWebsite} placeholder="https://citygeneral.com" />
                    <InputWithMeta label="Emergency Contact Number" value={emergencyPhone} onChange={setEmergencyPhone} placeholder="91753 67487" />
                </div>

                {/* Beds */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputWithMeta label="Number of Beds" value={beds} onChange={setBeds} placeholder="600" />
                    <InputWithMeta label="Number of ICU Beds" value={icuBeds} onChange={setIcuBeds} placeholder="200" />
                </div>

                {/* Ambulance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputWithMeta label="Number of Ambulances" value={ambulances} onChange={setAmbulances} placeholder="5" />
                    <InputWithMeta label="Ambulance Contact Number" value={ambulancePhone} onChange={setAmbulancePhone} placeholder="91753 67487" />
                </div>

                {/* Blood Bank */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputWithMeta label="Do you have Blood Bank?" requiredDot showInput={false}>
                        <div className="flex gap-4 mt-1">
                            <RadioButton name="bloodBank" className="" value="Yes" label="Yes" checked={bloodBank === "Yes"} onChange={() => setBloodBank("Yes")} />
                            <RadioButton name="bloodBank" value="No" label="No" checked={bloodBank === "No"} onChange={() => setBloodBank("No")} />
                        </div>
                    </InputWithMeta>
                    <InputWithMeta label="Blood Bank Contact Number" value={bloodBankPhone} onChange={setBloodBankPhone} placeholder="91753 67487" />
                </div>

                {/* About Us */}
                <div className="gap-1 flex flex-col">
                    <InputWithMeta label="About Us" showInput={false}>
                        <RichTextBox value={about} onChange={setAbout} />
                    </InputWithMeta>
                </div>

                {/* Photos */}
                <div>
                    <InputWithMeta label="Hospital Photos" showInput={false} />
                    <div className="flex flex-nowrap gap-3 mt-1 items-center overflow-x-auto mb-1 scrollbar-hide">
                        {photos.map((src, idx) => (
                            <div key={idx} className="relative w-[120px] h-[120px] bg-gray-100 rounded-md border border-gray-200 overflow-hidden shrink-0">
                                <img src={src} alt="Hospital" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <label className="w-[120px] h-[120px] border-dashed bg-blue-primary50 border-blue-primary150 border-[0.5px] rounded-md grid place-items-center text-blue-primary250 text-sm cursor-pointer shrink-0">
                            <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => onUploadPhotos(e.target.files)} />
                            <div className="flex flex-col items-center gap-1">
                                <img src={upload} alt="Upload" className="w-4 h-4" />
                                <span className="text-xs">Upload Photo</span>
                            </div>
                        </label>
                    </div>
                    <div className="text-[12px] text-secondary-grey200 mt-1">Support Size upto 2MB in .png, .jpg, .svg, .webp</div>
                </div>

                <div className="border-b-[0.5px] border-secondary-grey100 my-2"></div>

                {/* Address Section */}
                <div className="text-sm font-semibold text-secondary-grey400">Hospital Address</div>

                <div className="flex flex-col gap-2">
                    <div>
                        <InputWithMeta label="Map Location" infoIcon placeholder="Search Location" />
                        <div className="h-[100px] rounded-md overflow-hidden border mt-2">
                            <MapLocation
                                heightClass="h-full"
                                initialPosition={latLng.lat && latLng.lng ? [latLng.lat, latLng.lng] : null}
                                onChange={({ lat, lng }) => setLatLng({ lat, lng })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <InputWithMeta label="Block no./Shop no./House no." requiredDot value={blockNo} onChange={setBlockNo} placeholder="Survey No 111/11/1" />
                        <InputWithMeta label="Road/Area/Street" infoIcon requiredDot value={areaStreet} onChange={setAreaStreet} placeholder="Veerbhadra Nagar Road" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputWithMeta label="Landmark" infoIcon requiredDot value={landmark} onChange={setLandmark} placeholder="Near Chowk" />
                        <InputWithMeta label="Pincode" infoIcon requiredDot value={pincode} onChange={(v) => setPincode(v.replace(/[^0-9]/g, "").slice(0, 6))} placeholder="444001" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative">
                            <InputWithMeta label="City" requiredDot value={city} onChange={setCity} infoIcon RightIcon={ChevronDown} onFieldOpen={() => setCityOpen(!cityOpen)} dropdownOpen={cityOpen} onRequestClose={() => setCityOpen(false)} placeholder="Akola" />
                            <Dropdown open={cityOpen} onClose={() => setCityOpen(false)} items={cityOptions.map(c => ({ label: c, value: c }))} selectedValue={city} onSelect={(it) => { setCity(it.value); setCityOpen(false); }} className="w-full" anchorClassName="w-full" direction="up" />
                        </div>
                        <div className="relative">
                            <InputWithMeta label="State" requiredDot value={state} onChange={() => { }} infoIcon RightIcon={ChevronDown} onFieldOpen={() => setStateOpen(!stateOpen)} dropdownOpen={stateOpen} onRequestClose={() => setStateOpen(false)} readonlyWhenIcon placeholder="Maharashtra" />
                            <Dropdown open={stateOpen} onClose={() => setStateOpen(false)} items={stateOptions.map(s => ({ label: s, value: s }))} selectedValue={state} onSelect={(it) => { setState(it.value); setStateOpen(false); }} className="w-full" anchorClassName="w-full" direction="up" />
                        </div>
                    </div>

                </div>

            </div>
        </GeneralDrawer>
    );
}
