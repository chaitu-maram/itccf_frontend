import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  ChevronLeft,
  Users,
  Plus,
  Trash2,
} from 'lucide-react';

const inputCls =
  "h-11 w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 " +
  "text-base font-medium text-slate-800 placeholder:text-slate-400 " +
  "transition-all duration-150 focus:outline-none focus:border-blue-500 " +
  "focus:bg-white focus:ring-4 focus:ring-blue-100";

const labelCls =
  "text-sm font-semibold text-slate-700 mb-2 block tracking-normal";

export default function PostJob() {
  const navigate = useNavigate();

  const initialJobState = {
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    availableJobs: '',
    description: '',
  };

  const [jobs, setJobs] = useState([{ ...initialJobState }]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const updatedJobs = [...jobs];
    updatedJobs[index] = {
      ...updatedJobs[index],
      [e.target.name]: e.target.value,
    };
    setJobs(updatedJobs);
  };

  const addAnotherJob = () => {
    setJobs([...jobs, { ...initialJobState }]);
  };

  const removeJob = (index: number) => {
    if (jobs.length > 1) {
      const updatedJobs = jobs.filter((_, i) => i !== index);
      setJobs(updatedJobs);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Jobs Posted:', jobs);
    alert(`${jobs.length} Job(s) Posted Successfully! (Mock)`);
    navigate('/listpersons');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: "'Inter',system-ui,sans-serif",
        background: '#EFF6FF',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: 'none',
            color: '#3B82F6',
            cursor: 'pointer',
            fontWeight: 600,
            padding: 0,
            marginBottom: '20px',
          }}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} /> Back
        </button>

        <div style={{ marginBottom: '30px' }}>
          <h1
            style={{
              fontSize: '28px',
              color: '#1E3A5F',
              marginBottom: '8px',
              fontWeight: 800,
            }}
          >
            Post Jobs
          </h1>

          <p
            style={{
              color: '#64748B',
              fontSize: '14px',
              margin: 0,
            }}
          >
            Fill in the details below to publish one or more open positions.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {jobs.map((job, index) => (
            <div
              key={index}
              style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                padding: '30px',
                border: '1px solid #BFDBFE',
                position: 'relative',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      background:
                        'linear-gradient(135deg, #3B82F6, #2563EB)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      boxShadow: '0 4px 10px rgba(37,99,235,0.25)',
                    }}
                  >
                    {index + 1}
                  </div>

                  <h2
                    style={{
                      fontSize: '18px',
                      color: '#1E293B',
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    Job Posting
                  </h2>
                </div>

                {jobs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeJob(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(239,68,68,0.1)',
                      color: '#EF4444',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 style={{ width: 14, height: 14 }} />
                    Remove
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-5">
                {/* Company */}
                <div className="flex flex-col">
                  <label className={labelCls}>Company Name</label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
                      <Building2 className="w-4 h-4" />
                    </span>

                    <input
                      name="company"
                      value={job.company}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. HR Connect Inc."
                      required
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </div>


                {/* Job Title */}
                <div className="flex flex-col">
                  <label className={labelCls}>Job Role</label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
                      <Briefcase className="w-4 h-4" />
                    </span>

                    <input
                      name="title"
                      value={job.title}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. Senior React Developer"
                      required
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                </div>

               

                <div className="flex gap-4 flex-wrap">
                  {/* Location */}
                  <div className="flex flex-col flex-1 min-w-[200px]">
                    <label className={labelCls}>Location</label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
                        <MapPin className="w-4 h-4" />
                      </span>

                      <input
                        name="location"
                        value={job.location}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="e.g. Remote or Hyderabad"
                        required
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                  </div>

                  {/* Employment Type */}
                 
                </div>

                <div className="flex gap-4 flex-wrap">
                  {/* Salary */}
                  <div className="flex flex-col flex-1 min-w-[200px]">
                    <label className={labelCls}>
                      Salary (Optional)
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
                        <DollarSign className="w-4 h-4" />
                      </span>

                      <input
                        name="salary"
                        value={job.salary}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="e.g. ₹8 LPA - ₹12 LPA"
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                  </div>

                  {/* Available Jobs */}
                  <div className="flex flex-col flex-1 min-w-[200px]">
                    <label className={labelCls}>
                      No. of Available Jobs
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
                        <Users className="w-4 h-4" />
                      </span>

                      <input
                        type="number"
                        min="1"
                        name="availableJobs"
                        value={job.availableJobs}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="e.g. 5"
                        required
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label className={labelCls}>Job Description</label>

                  <textarea
                    name="description"
                    value={job.description}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Describe responsibilities, requirements, and benefits..."
                    required
                    rows={4}
                    className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 text-base font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '10px',
            }}
          >
            <button
              type="button"
              onClick={addAnotherJob}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#fff',
                color: '#2563EB',
                fontWeight: 700,
                padding: '14px',
                borderRadius: '10px',
                border: '2px dashed #93C5FD',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EFF6FF';
                e.currentTarget.style.borderColor = '#60A5FA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = '#93C5FD';
              }}
            >
              <Plus style={{ width: 18, height: 18 }} />
              Post Another Job
            </button>

            <button
              type="submit"
              style={{
                flex: 2,
                background:
                  'linear-gradient(135deg, #2563EB, #1D4ED8)',
                color: '#fff',
                fontWeight: 700,
                padding: '14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
              }}
            >
              Submit All Jobs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}