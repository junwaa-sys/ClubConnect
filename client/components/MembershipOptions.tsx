import {
  Accordion,
  Button,
  Center,
  Chip,
  Flex,
  Space,
  Title,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { initiateCheckoutSession } from '../actions/checkout'
import { fetchMembershipOptions } from '../actions/MembershipOptions'
import { useNavigate } from 'react-router-dom'
import { fetchCurrentMember } from '../actions/currentMember'

export default function MembershipOptions() {
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useAppDispatch()
  const checkoutState = useAppSelector((state) => state.checkout)
  const currentMember = useAppSelector((state) => state.currentMember)
  const membershipOptionsState = useAppSelector(
    (state) => state.membershipOptions
  )
  const navigate = useNavigate()

  const [selected, setSelected] = useState(0)

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        dispatch(fetchMembershipOptions(token))
        dispatch(fetchCurrentMember(token))
        return
      })
      .catch(() => {
        console.log(
          'Something went wrong while retrieving the available options'
        )
      })
  }, [dispatch, getAccessTokenSilently])

  useEffect(() => {
    if (currentMember.data?.subscriptionId) {
      setSelected(currentMember.data?.subscriptionId)
    }
  }, [currentMember.data])

  useEffect(() => {
    if (checkoutState.data) {
      checkoutState.data.url
        ? (location.href = checkoutState.data.url)
        : navigate('/')
    }
  }, [checkoutState.data, navigate])

  function handleChipClick(
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    const packageId = evt.currentTarget.id.slice(4)
    setSelected(Number(packageId))
  }
  async function handleButtonClick() {
    const accessToken = await getAccessTokenSilently()
    dispatch(
      initiateCheckoutSession(
        selected,
        currentMember.data?.stripe_id,
        accessToken
      )
    )
  }

  return (
    <div style={{ width: '80%' }}>
      <Title order={2}>Select a membership option</Title>
      <div className="options-container">
        {membershipOptionsState.loading && (
          <Center>
            <div className="lds-dual-ring"></div>
          </Center>
        )}
        <Accordion>
          {membershipOptionsState.data &&
            membershipOptionsState.data.map((option) => {
              const checked = option.id == selected
              return (
                <Accordion.Item value={option.name} key={option.id}>
                  <Accordion.Control>
                    <Flex justify="space-between">{option.name} </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Flex justify="space-between">
                      <p>{`$${option.price} ${option.cover_period}`}</p>
                      {option.id === currentMember.data?.subscriptionId ? (
                        <Chip checked={checked}>You&apos;re on this plan</Chip>
                      ) : (
                        <Chip
                          checked={checked}
                          id={`item${option.id}`}
                          onClick={handleChipClick}
                        >
                          Select this plan
                        </Chip>
                      )}
                    </Flex>
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
        </Accordion>
        <Space h="md" />
        <Button onClick={handleButtonClick} color="#78b29c">
          Update subscription
        </Button>
      </div>
    </div>
  )
}
