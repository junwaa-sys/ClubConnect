import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchMemberSubscription } from '../actions/dashboard'
import { fetchCreateMemberProfile } from '../actions/createMemberProfile'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Flex, Title, Text, Center } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCurrentMember } from '../actions/currentMember'
import { initiateCheckoutPortal } from '../actions/checkout'

function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const checkoutState = useAppSelector((state) => state.checkout)
  const currentMember = useAppSelector((state) => state.currentMember)

  const auth0_id = user?.sub
  const memberProfile = useMemo(
    () => ({
      auth0_id: user?.sub ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
    }),
    [user]
  )

  useEffect(() => {
    if (checkoutState.data) {
      checkoutState.data.url
        ? (location.href = checkoutState.data.url)
        : navigate('/')
    }
  }, [checkoutState.data, navigate])

  useEffect(() => {
    dispatch(fetchCreateMemberProfile(memberProfile))
    if (auth0_id) {
      dispatch(fetchMemberSubscription(auth0_id))
    }
  }, [dispatch, memberProfile, auth0_id])

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        dispatch(fetchCurrentMember(token))
      })
      .catch(() => console.error('Something went wrong'))
  }, [getAccessTokenSilently, dispatch])

  async function handleManagePlanClick() {
    const token = await getAccessTokenSilently()
    if (currentMember.data?.subscriptionId && currentMember.data?.stripe_id) {
      dispatch(
        initiateCheckoutPortal(
          currentMember.data?.subscriptionId,
          currentMember.data?.stripe_id,
          token
        )
      )
    }
  }
  return (
    <>
      {currentMember.loading && (
        <Center>
          <div className="lds-dual-ring"></div>
        </Center>
      )}
      {currentMember.data && (
        <div className="dashboard-container">
          <Title order={1} className="dashboard-welcome">
            👋 Welcome{' '}
            <span className="blue-bold">{currentMember.data.name}</span>!
          </Title>
          <Title order={3}></Title>
          <Title order={3} className="dashboard-subscriptions-header">
            Your Subscriptions:
          </Title>
          {currentMember.data.cover_period === 'concession' && (
            <Text className="dashboard-subscriptions-para">
              You have{' '}
              <span className="blue-bold">
                {currentMember.data?.concession_qty}{' '}
              </span>{' '}
              concession trip(s) remaining!
            </Text>
          )}
          {currentMember.data.subscriptionId ? (
            <>
              <Text className="dashboard-subscriptions-para">
                You are currently on the{' '}
                <span className="dashboard-sub-data">
                  {currentMember.data.subscriptionName} $
                  {currentMember.data.price}{' '}
                </span>
                plan!
              </Text>
              <Text className="dashboard-subscriptions-para">
                {' '}
                Your plan renews on{' '}
                <span className="dashboard-sub-data">
                  {currentMember.data.renewal_date}
                </span>{' '}
              </Text>
              <Flex
                style={{ margin: '0 auto', maxWidth: '100%' }}
                justify="space-around"
                align="center"
              >
                <Button
                  onClick={handleManagePlanClick}
                  radius="md"
                  size="md"
                  style={{ margin: '24px' }}
                  color="#78b29c"
                  variant="outline"
                >
                  Manage Plan
                </Button>
                <Link to={'/membership-options'}>
                  <Button
                    radius="md"
                    size="md"
                    style={{ margin: '24px' }}
                    color="#78b29c"
                  >
                    Change Plan
                  </Button>
                </Link>
              </Flex>

              {/* TODO Genearate QR Code functionality  
          <Button radius="md" size="xl" style={{ margin: '24px' }}>
            Generate QR Code
          </Button>*/}
            </>
          ) : (
            <>
              <p className="dashboard-subscriptions-para">
                You are not currently on a plan. Click here to sign up:{' '}
              </p>
              <Link to={'/membership-options'} style={{ margin: '24px' }}>
                <Button
                  radius="md"
                  size="xl"
                  style={{ margin: '24px' }}
                  color="#78b29c"
                >
                  Sign Up Now!
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Dashboard
