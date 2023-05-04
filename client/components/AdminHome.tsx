import { useEffect } from 'react'
import { Accordion, Grid, Title, Button, Flex, Text } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getActiveMembers } from '../actions/getActiveMember'
import { getExpiryDates } from '../actions/getExpiryList'
import { useAuth0 } from '@auth0/auth0-react'
import EmailModal from './EmailModal'

export default function AdminHome() {
  const dispatch = useAppDispatch()
  const activeMembers = useAppSelector((state) => state.getActiveMember)
  const expiryDateList = useAppSelector((state) => state.getExpiryDates)
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function getDispatch() {
      const token = await getAccessTokenSilently()
      dispatch(getActiveMembers(token))
      dispatch(getExpiryDates(token))
    }
    getDispatch()
  }, [dispatch, getAccessTokenSilently])

  if (!activeMembers) {
    return (
      <>
        <div>Loadings....</div>
      </>
    )
  } else {
    return (
      <div style={{ width: '80%' }}>
        <Grid>
          <Grid.Col span={6}>
            <Title mb={10} align="center" order={2}>
              <Flex align="center" justify="center" gap="xl" m={10}>
                Top Active Members
              </Flex>
            </Title>
            <Accordion
              variant="contained"
              radius="md"
              defaultValue="customization"
            >
              {activeMembers.data?.map((member, index) => {
                return (
                  <>
                    <Accordion.Item
                      key={index}
                      value={member.memberId.toString()}
                    >
                      <Accordion.Control>{member.memberName}</Accordion.Control>
                      <Accordion.Panel>
                        <Grid>
                          <Grid.Col span={6}>
                            <Text>Renewal Date: {member.renewalDate}</Text>
                            <Text>Concession Left: {member.concessionQty}</Text>
                          </Grid.Col>
                          <Grid.Col span={4} offset={2}>
                            <Button size="xs" color="#78b29c">
                              MANAGE
                            </Button>
                          </Grid.Col>
                        </Grid>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </>
                )
              })}
            </Accordion>
          </Grid.Col>
          <Grid.Col span={6}>
            <Title mb={10} align="center" order={2}>
              <Flex align="center" justify="center" gap="xl" m={10}>
                Expiring Soon
                {/* <Button size="xs">SEND NOTIFICATION.</Button> */}
              </Flex>
            </Title>
            <Accordion
              variant="contained"
              radius="md"
              defaultValue="customization"
            >
              {expiryDateList.data?.map((expiryDate, index) => {
                return (
                  <>
                    <Accordion.Item
                      key={index}
                      value={expiryDate.memberId.toString()}
                    >
                      <Accordion.Control>
                        {expiryDate.memberName}
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Grid>
                          <Grid.Col span={6}>
                            <Text>Renewal Date: {expiryDate.renewalDate}</Text>
                            <Text>
                              Concession Left: {expiryDate.concessionQty}
                            </Text>
                          </Grid.Col>
                          <EmailModal
                            emailMsg={{
                              email: expiryDate.memberEmail,
                              subject: 'Renewal Notification',
                              content: `Hello ${expiryDate.memberName}!,
                              \n
                              \nPlease be noted that your subscription is expirying soon`,
                            }}
                          />
                        </Grid>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </>
                )
              })}
            </Accordion>
          </Grid.Col>
        </Grid>
      </div>
    )
  }
}
