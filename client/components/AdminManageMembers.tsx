import { useEffect } from 'react'
import {
  Paper,
  Text,
  Avatar,
  Grid,
  Flex,
  Stack,
  Container,
  Input,
  Button,
  Drawer,
  Badge,
  Center,
} from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getMemberList } from '../actions/getMemberList'
import { recordCheckin } from '../actions/recordCheckin'
import { deleteCheckin } from '../actions/deleteCheckin'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { fetchMemberSubscription } from '../actions/dashboard'
import { useDisclosure } from '@mantine/hooks'
import { MemberProfile } from '../../models/memberSubscription'
import AdminEditMember from './AdminEditMember'
import * as models from '../../models/adminManageMember'

export default function AdminManageMembers() {
  const [searchName, setSearchName] = useState<string>('')
  const [opened, { open, close }] = useDisclosure(false)
  const dispatch = useAppDispatch()
  const memberList = useAppSelector((state) => state.getMemberList)
  const { getAccessTokenSilently } = useAuth0()
  const checkedinId = useAppSelector((state) => state.recordCheckin)
  const deletedCheckin = useAppSelector((state) => state.deleteCheckin)
  const member = useAppSelector((state) => state.memberSubscription)

  useEffect(() => {
    async function getDispatch() {
      const token = await getAccessTokenSilently()
      dispatch(getMemberList(token))
    }
    getDispatch()
  }, [dispatch, getAccessTokenSilently, checkedinId, deletedCheckin])

  const memberListAfterSearch = memberList.data?.filter((member) => {
    if (searchName == '') {
      return member
    } else {
      if (member.memberName.toLowerCase().includes(searchName.toLowerCase())) {
        return member
      } else {
        return null
      }
    }
  })

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value)
  }

  async function handleClick(memberDetails: MemberProfile) {
    const id = memberDetails.auth0Id
    if (id) {
      await dispatch(fetchMemberSubscription(id))
    }
  }

  async function handleCheckin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    memberDettails: models.MemberList
  ) {
    e.preventDefault()
    console.log(memberDettails)

    const utcDate = new Date()
    const formattedDate = `${utcDate.getFullYear()}-${(utcDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${utcDate.getDate().toString().padStart(2, '0')}` //formate to YYYY-MM-DD

    const token = await getAccessTokenSilently()
    dispatch(recordCheckin(token, memberDettails, formattedDate))
  }

  async function handleDelCheckin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    checkinId: number
  ) {
    e.preventDefault()
    const token = await getAccessTokenSilently()
    dispatch(deleteCheckin(token, { id: checkinId }))
  }

  if (!memberListAfterSearch) {
    return (
      <div>
        <Flex
          mih={50}
          gap="md"
          justify="flex-end"
          align="center"
          direction="row"
          wrap="wrap"
          mb={10}
        >
          <Input.Wrapper label="Search By Name">
            <Input
              placeholder="Enter Name"
              onChange={handleChangeName}
              value={searchName}
            />
          </Input.Wrapper>
        </Flex>
      </div>
    )
  } else {
    return (
      <div style={{ width: '50%' }}>
        <Flex
          mih={50}
          gap="md"
          justify="flex-end"
          align="center"
          direction="row"
          wrap="wrap"
          mb={10}
          mr={50}
        >
          <Input.Wrapper label="Search By Name">
            <Input
              placeholder="Enter Name"
              onChange={handleChangeName}
              value={searchName}
            />
          </Input.Wrapper>
        </Flex>
        {memberListAfterSearch.map((memberDetails, index) => {
          return (
            <div key={index}>
              <Grid justify="center" mb={40}>
                <Grid.Col span={1}>
                  <Avatar size="xl" src="avatar.png" alt="it's me" />
                </Grid.Col>
                <Grid.Col span={8}>
                  <Container>
                    <Stack
                      justify="flex-start"
                      spacing="sm"
                      h={100}
                      sx={(theme) => ({
                        backgroundColor:
                          theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                      })}
                    >
                      <Paper shadow="md" p="md" withBorder>
                        <Grid>
                          <Grid.Col span={6}>
                            <Text>{memberDetails.memberName}</Text>
                            <Text>
                              {memberDetails.subscriptionName ? (
                                memberDetails.subscriptionName
                              ) : (
                                <Text color="red">No Active Subscription</Text>
                              )}
                            </Text>
                            <Text>
                              Concession Left: {memberDetails.concessionQty}
                            </Text>
                            <Text>
                              Checked in at: {memberDetails.createdAt}
                            </Text>
                          </Grid.Col>
                          {memberDetails.createdAt != null ? (
                            <Grid.Col span={6}>
                              <Flex justify="flex-end">
                                <Badge color="teal" size="sm" variant="filled">
                                  checked in
                                </Badge>
                                <Button
                                  size="xs"
                                  ml={5}
                                  radius="xl"
                                  onClick={() => {
                                    handleClick(memberDetails)
                                    open()
                                  }}
                                  color="#78b29c"
                                >
                                  Manage
                                </Button>
                                <Button
                                  size="xs"
                                  color="red"
                                  ml={5}
                                  radius="xl"
                                  onClick={(e) => {
                                    handleDelCheckin(e, memberDetails.checkinId)
                                  }}
                                >
                                  Check Out
                                </Button>
                              </Flex>
                            </Grid.Col>
                          ) : !memberDetails.subscriptionName ||
                            memberDetails.concessionQty == 0 ? (
                            <Grid.Col span={6}>
                              <Flex justify="flex-end">
                                <Button
                                  size="xs"
                                  ml={5}
                                  radius="xl"
                                  onClick={() => {
                                    handleClick(memberDetails)
                                    open()
                                  }}
                                  color="#78b29c"
                                >
                                  Manage
                                </Button>
                                <Button
                                  size="xs"
                                  ml={5}
                                  radius="xl"
                                  onClick={(e) => {
                                    handleCheckin(e, memberDetails)
                                  }}
                                  disabled
                                >
                                  Check In
                                </Button>
                              </Flex>
                            </Grid.Col>
                          ) : (
                            <Grid.Col span={6}>
                              <Flex justify="flex-end">
                                <Button
                                  size="xs"
                                  ml={5}
                                  radius="xl"
                                  onClick={() => {
                                    handleClick(memberDetails)
                                    open()
                                  }}
                                  color="#78b29c"
                                >
                                  Manage
                                </Button>
                                <Button
                                  size="xs"
                                  ml={5}
                                  radius="xl"
                                  onClick={(e) => {
                                    handleCheckin(e, memberDetails)
                                  }}
                                >
                                  Check In
                                </Button>
                              </Flex>
                            </Grid.Col>
                          )}
                        </Grid>
                      </Paper>
                    </Stack>
                  </Container>
                </Grid.Col>
              </Grid>
              <Drawer
                opened={opened}
                onClose={close}
                title="Edit Details"
                position="right"
              >
                {member.loading && (
                  <Center>
                    <div className="lds-dual-ring"></div>
                  </Center>
                )}
                {member.data && <AdminEditMember memberProfile={member.data} />}
              </Drawer>
            </div>
          )
        })}
      </div>
    )
  }
}
