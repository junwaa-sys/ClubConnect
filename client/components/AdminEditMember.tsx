import React, { useState } from 'react'
import { MemberProfile } from '../../models/memberSubscription'
import { Button, Select } from '@mantine/core'
import { fetchUpdateMemberProfile } from '../actions/adminEditMember'
import { useAppDispatch } from '../hooks/hooks'

interface Props {
  memberProfile: MemberProfile
}

function AdminEditMember(props: Props) {
  const dispatch = useAppDispatch()
  const [name, setName] = useState(props?.memberProfile.memberName)
  const [address, setAddress] = useState(props?.memberProfile.address)
  const [phone, setPhone] = useState(props?.memberProfile.phone)
  const [email, setEmail] = useState(props?.memberProfile.memberEmail)
  const [emergencyContactName, setEmergencyContactName] = useState(
    props?.memberProfile.emergencyContactName
  )
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(
    props?.memberProfile.emergencyContactPhone
  )
  const [isEditingInfo, setIsEditingInfo] = useState(false)

  function handleUpdateInfoClick() {
    setIsEditingInfo(true)
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const updatedMemberProfile: MemberProfile = {
      name,
      address,
      phone,
      email: email,
      emergency_contact_name: emergencyContactName,
      emergency_contact_phone: emergencyContactPhone,
    }

    dispatch(
      fetchUpdateMemberProfile(
        props?.memberProfile.auth0id || '',
        updatedMemberProfile
      )
    )

    window.location.href = '/admin/manage-member'
  }

  function handleDeleteUserClick() {
    alert(
      `Are you sure you want to delete this member: ${props.memberProfile.memberName}? `
    )
  }

  return (
    <div style={{ width: '80%' }}>
      {isEditingInfo ? (
        <div className="edit-member-container">
          <form
            className="edit-member-container-form"
            onSubmit={handleFormSubmit}
          >
            <label>
              Name:
              <input
                type="text"
                value={name}
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={address}
                defaultValue={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                value={phone}
                defaultValue={phone}
                onChange={(event) => setPhone(Number(event.target.value))}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                defaultValue={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Emergency Contact:
              <input
                type="text"
                value={emergencyContactName}
                defaultValue={emergencyContactName}
                onChange={(event) =>
                  setEmergencyContactName(event.target.value)
                }
              />
            </label>
            <label>
              Emergency Contact Phone:
              <input
                type="text"
                value={emergencyContactPhone}
                defaultValue={emergencyContactPhone}
                onChange={(event) =>
                  setEmergencyContactPhone(Number(event.target.value))
                }
              />
            </label>
            <Button
              className="edit-member-submit"
              type="submit"
              color="#78b29c"
            >
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <>
          <div className="edit-member-container-unedited">
            <p className="edit-member-container-para">
              <span className="edit-member-container-left">Name:</span>{' '}
              {props?.memberProfile.memberName}
            </p>
            <p className="edit-member-container-para">
              <span className="edit-member-container-left">Address: </span>
              {props?.memberProfile.address}
            </p>
            <p className="edit-member-container-para">
              <span className="edit-member-container-left">Phone Number: </span>
              {props?.memberProfile.phone}
            </p>
            <p className="edit-member-container-para">
              <span className="edit-member-container-left">Email: </span>
              {props?.memberProfile.memberEmail}
            </p>
            <p className="edit-member-container-para">
              <span className="edit-member-container-left">
                Emergency Contact:{' '}
              </span>
              {props?.memberProfile.emergencyContactName}
            </p>
            <p className="edit-member-container-para">
              <span className="edit-member-container-left">
                Emergency Contact Phone:{' '}
              </span>
              {props?.memberProfile.emergencyContactPhone}
            </p>
            <Button
              className="edit-member-info-button"
              onClick={handleUpdateInfoClick}
              color="#78b29c"
            >
              Edit Info
            </Button>
          </div>
        </>
      )}
      <div className="edit-member-container-form">
        <h2 className="edit-member-sub-header">Subscription Info</h2>
        <p className="edit-member-container-para">
          {props?.memberProfile.paymentStatus === 'paid' ? (
            <>
              <p className="edit-member-container-para">
                <span className="edit-member-container-left">Active </span> -{' '}
                {props.memberProfile.subscriptionName}{' '}
                {props.memberProfile.subscriptionPrice}
              </p>
              <p className="edit-member-container-para">
                <span className="edit-member-container-left">
                  Next Renewal:{' '}
                </span>{' '}
                {props?.memberProfile.renewalDate?.toLocaleString()}
              </p>
            </>
          ) : (
            <p>Inactive</p>
          )}
        </p>
        <Select
          label="Manage Subscription"
          placeholder="Choose an option"
          data={[
            { value: 'cancelMembership', label: 'Cancel Membership' },
            { value: 'changeSubscription', label: 'Change Subscription' },
            { value: 'extendSubscription', label: 'Extend Subscription' },
            { value: 'sendPaymentReminder', label: 'Send Payment Reminder' },
          ]}
        />
        <Button className="edit-member-sub-button" color="#78b29c">
          Update Subscription
        </Button>
        <Button
          style={{ backgroundColor: 'red' }}
          onClick={handleDeleteUserClick}
          className="edit-member-sub-button"
        >
          Delete User
        </Button>
      </div>
    </div>
  )
}

export default AdminEditMember
