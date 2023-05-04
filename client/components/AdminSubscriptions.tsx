import {
  Accordion,
  Button,
  Center,
  Chip,
  Drawer,
  Flex,
  Text,
  SegmentedControl,
  Space,
  TextInput,
  Title,
  NumberInput,
  Switch,
  HoverCard,
  Grid,
  Stack,
  Paper,
  Modal,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import {
  addMembershipOption,
  fetchAllMembershipOptions,
  archiveMembershipOption,
  restoreMembershipOption,
  deleteMembershipOption,
} from '../actions/AdminMembershipOptions'
import {
  IconCloudUpload,
  IconCurrencyDollar,
  IconEdit,
  IconHash,
} from '@tabler/icons-react'
import { Subscription } from '../../models/subscriptions'
import { MemberList } from '../../models/adminManageMember'
import { getMemberList } from '../actions/getMemberList'

export default function AdminSubcriptions() {
  const [drawerOpened, drawerHandler] = useDisclosure(false)
  const [modalOpened, modalHandler] = useDisclosure(false)
  const [selected, setSelected] = useState({} as Subscription)
  const [subbedMembers, setSubbedMembers] = useState([] as MemberList[])
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useAppDispatch()
  const { data, loading, error } = useAppSelector(
    (state) => state.adminMembershipOptions
  )
  const membersState = useAppSelector((state) => state.getMemberList)

  //\\///~~~Form controls~~~\\\//\\
  const [name, setName] = useState(selected.name)
  const [coverPeriod, setCoverPeriod] = useState(selected.cover_period)
  const [price, setPrice] = useState<number | ''>(selected.price)
  const [qty, setQty] = useState<number | ''>(selected.default_concessions)
  const [checked, setChecked] = useState(!selected.is_published)
  //\\///~End form controls~\\\//\\
  const initialValue = {
    id: 0,
    name: '',
    cover_period: 'single',
    is_published: false,
    price: 0,
    stripe_product: '',
    stripe_price: '',
    is_active: false,
    default_concessions: 0,
    archived: false,
  }
  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        dispatch(fetchAllMembershipOptions(token))
        dispatch(getMemberList(token))
      })
      .catch(() => {
        console.log(
          'Something went wrong while retrieving the available options'
        )
      })
  }, [dispatch, getAccessTokenSilently])

  useEffect(() => {
    setName(selected.name)
    setCoverPeriod(selected.cover_period)
    setPrice(selected.price)
    setQty(selected.default_concessions)
    setChecked(selected.is_published)
    const subs = membersState.data?.filter((member) => {
      member.subscriptionId !== selected.id
    })
    if (subs) {
      setSubbedMembers(subs)
    }
  }, [selected])

  function handleEditClick(
    evt: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    const packageId = evt.currentTarget.id.slice(4)
    const selectedOption = data?.filter(
      (option) => option.id == Number(packageId)
    )
    if (selectedOption) {
      setSelected(selectedOption[0])
      setCoverPeriod(selectedOption[0].cover_period)
    } else {
      setSelected(initialValue)
    }
    drawerHandler.open()
  }

  function handleNewClick() {
    setSelected(initialValue)
    drawerHandler.open()
  }

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    const formData = {
      id: selected.id,
      name: name,
      cover_period: coverPeriod,
      price,
      default_concessions: qty,
      is_published: checked,
      archived: false,
    }

    const accessToken = await getAccessTokenSilently()
    dispatch(addMembershipOption(formData, accessToken))
    drawerHandler.close()
  }

  async function handleArchiveClick() {
    const accessToken = await getAccessTokenSilently()
    dispatch(archiveMembershipOption(selected.id, accessToken))
    drawerHandler.close()
  }

  async function handleRestoreClick(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    const accessToken = await getAccessTokenSilently()
    const target = e.target as HTMLInputElement
    const id = target.id.slice(4)
    dispatch(restoreMembershipOption(Number(id), accessToken))
  }

  async function handleDeleteClick() {
    const token = await getAccessTokenSilently()
    dispatch(deleteMembershipOption(selected.id, token))
    modalHandler.close()
    drawerHandler.close()
  }

  //~~~ Fitered lists ~~~\\
  const publishedList = data?.filter(
    (item) => item.is_published && !item.archived
  )
  const draftList = data?.filter((item) => !item.is_published && !item.archived)
  const archivedList = data?.filter((item) => item.archived)

  return (
    <div style={{ width: '80%' }}>
      <Title order={2}>Your membership options</Title>
      <Space h="xl" />
      <Grid>
        <Grid.Col span={6}>
          <Grid justify="space-between" align="center">
            <Grid.Col span="content">
              <Title order={3}>Published</Title>
            </Grid.Col>
          </Grid>
          <Space h="md" />
          <div className="options-container">
            {error && <Text>Something went wrong</Text>}
            {loading && (
              <Center>
                <div className="lds-dual-ring"></div>
              </Center>
            )}
            <Accordion
              variant="separated"
              styles={{
                item: {
                  // styles added to all items
                  backgroundColor: '#fff',
                  border: '1px solid #ededed',

                  // styles added to expanded item
                  '&[data-active]': {
                    backgroundColor: '#fff',
                  },
                },
              }}
            >
              {publishedList &&
                publishedList.map((option) => {
                  return (
                    <Accordion.Item value={option.name} key={option.id}>
                      <Accordion.Control>
                        <Text>{option.name} </Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Flex justify="space-between">
                          <p>{`$${option.price} ${option.cover_period}`}</p>
                          <Chip
                            checked={false}
                            onClick={handleEditClick}
                            id={`item${option.id}`}
                          >
                            Edit
                          </Chip>
                        </Flex>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )
                })}
            </Accordion>
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid justify="space-between" align="center">
            <Grid.Col span="content">
              <Title order={3}>Draft</Title>
            </Grid.Col>
            <Grid.Col span="content">
              <Button onClick={handleNewClick} color="#78b29c">
                Add new
              </Button>
            </Grid.Col>
          </Grid>
          <Space h="md" />
          <div className="options-container">
            {loading && (
              <Center>
                <div className="lds-dual-ring"></div>
              </Center>
            )}
            <Accordion
              variant="separated"
              styles={{
                item: {
                  backgroundColor: '#fff',
                  border: '1px solid #ededed',
                  '&[data-active]': {
                    backgroundColor: '#fff',
                  },
                },
              }}
            >
              {draftList &&
                draftList.map((option) => {
                  return (
                    <Accordion.Item value={option.name} key={option.id}>
                      <Accordion.Control>
                        <Text>{option.name} </Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Flex justify="space-between">
                          <p>{`$${option.price} ${option.cover_period}`}</p>
                          <Chip
                            checked={false}
                            onClick={handleEditClick}
                            id={`item${option.id}`}
                          >
                            Edit
                          </Chip>
                        </Flex>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )
                })}
            </Accordion>
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Accordion>
            <Accordion.Item value="archived">
              <Accordion.Control>
                <Text>Archived</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  {archivedList &&
                    archivedList.map((item) => {
                      return (
                        <Paper
                          key={item.id}
                          shadow="xs"
                          p="md"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {item.name}
                          <Chip
                            id={`item${item.id}`}
                            onClick={handleRestoreClick}
                            checked={false}
                          >
                            Restore
                          </Chip>
                        </Paper>
                      )
                    })}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Grid.Col>
      </Grid>

      <Space h="md" />

      <Drawer
        opened={drawerOpened}
        onClose={drawerHandler.close}
        position="right"
        size="lg"
      >
        {selected.id ? (
          <Title order={3}>Edit subscription type</Title>
        ) : (
          <Title order={3}>Create new subscription type</Title>
        )}

        <form>
          <TextInput
            label="Subscription name"
            description="Enter a name that will be displayed to your members"
            defaultValue={selected.name}
            onChange={(event) => setName(event.currentTarget.value)}
          ></TextInput>
          <Space h="sm" />
          <Text fz="sm" fw={500}>
            Subscription Period
          </Text>
          <Text fz="xs" fw={400} color="#868e96">
            What period will this option cover?
          </Text>
          <Space h="xs" />
          <SegmentedControl
            value={coverPeriod}
            onChange={setCoverPeriod}
            data={[
              { label: 'Single', value: 'single' },
              { label: 'Weekly', value: 'week' },
              { label: 'Fortnightly', value: 'fortnight' },
              { label: 'Monthly', value: 'month' },
              { label: 'Annual', value: 'year' },
              { label: 'Concession', value: 'concession' },
            ]}
          />
          <NumberInput
            label="Price"
            description="Note: for recurring subscriptions this price will be automatically charged at the indicated frequency above"
            defaultValue={selected.price}
            icon={<IconCurrencyDollar size="1rem" />}
            hideControls
            value={price}
            onChange={setPrice}
            precision={2}
          />
          <NumberInput
            label="Class allocation"
            description="The number of classes a member can attend per period (i.e. 4x classes weekly). For concession, enter the number of classes included for the price."
            icon={<IconHash size="1rem" />}
            defaultValue={selected.default_concessions}
            hideControls
            value={qty}
            onChange={setQty}
          />
          <Space h="sm" />
          <Switch
            size="lg"
            checked={checked}
            onLabel="Publish"
            offLabel="Draft"
            color="green"
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          <Space h="md" />
          {checked ? (
            <>
              <Button
                leftIcon={<IconCloudUpload />}
                variant="outline"
                color="green"
                onClick={handleSubmit}
              >
                Publish Now
              </Button>
              <Text fz="xs">
                Note that this will be immediately visible to your members.
                Toggle the switch above to draft to save without publishing.
              </Text>
            </>
          ) : (
            <>
              <Button
                leftIcon={<IconEdit />}
                variant="outline"
                color="orange"
                onClick={handleSubmit}
              >
                Save as draft
              </Button>
              <Text fz="xs">
                Note that drafts are not visible to members. Any members with
                this subscription active will not be affected, but they will be
                able to see this option if the try to change membership types.{' '}
              </Text>
            </>
          )}
        </form>
        <Space h="xl" />
        {selected.id ? (
          <Flex justify="flex-start" gap="md">
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <div>
                  <Button onClick={handleArchiveClick} color="#78b29c">
                    Archive
                  </Button>
                </div>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">
                  Archived subscriptions are not visible to members. Members on
                  this subscription will be unaffected until they change
                  subscription types.
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
            {subbedMembers.length >= 1 ? (
              <HoverCard width={280} shadow="md">
                <HoverCard.Target>
                  <div>
                    <Button disabled>Delete</Button>
                  </div>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">
                    There are members with this subscription type active. Move
                    them to a new subscription type before deleting this one.
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard>
            ) : (
              <Button color="red" onClick={modalHandler.open}>
                Delete
              </Button>
            )}
          </Flex>
        ) : (
          <div></div>
        )}
      </Drawer>
      <Modal opened={modalOpened} onClose={modalHandler.close}>
        <Title order={3} align="center">
          Are you sure you want to delete this subscription type?
        </Title>
        <Text align="center">This action cannot be undone.</Text>
        <Space h="xl" />
        <Flex justify="center">
          <Button
            variant="outline"
            style={{ marginRight: '5px' }}
            color="#78b29c"
          >
            No, go back
          </Button>
          <Button
            color="red"
            onClick={handleDeleteClick}
            style={{ marginLeft: '5px' }}
          >
            Yes, delete
          </Button>
        </Flex>
        <Space h="xl" />
      </Modal>
    </div>
  )
}
