import { useDisclosure } from '@mantine/hooks'
import {
  Modal,
  Button,
  Grid,
  TextInput,
  Flex,
  Title,
  Textarea,
} from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import api from '../apis/adminHome'
import * as models from '../../models/adminHome'

interface Props {
  emailMsg: models.EmailBody
}

export default function CheckoutModal(props: Props) {
  const [opened, { open, close }] = useDisclosure(false)

  function handleSubmit(values: models.EmailBody) {
    api
      .sendEmail(values)
      .then(() => {
        close()
      })
      .catch(() => {
        close()
      })
  }

  const form = useForm({
    initialValues: {
      email: props.emailMsg.email,
      subject: props.emailMsg.subject,
      content: props.emailMsg.content,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <Title order={3} align="center">
          Email
        </Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex
            mih={60}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <TextInput
              withAsterisk
              w={400}
              icon={<IconAt size="0.8rem" />}
              label="Email Address"
              placeholder="Customer's Email Address"
              {...form.getInputProps('email')}
              required
            />
            <TextInput
              withAsterisk
              w={400}
              label="Subject"
              placeholder="Subject"
              {...form.getInputProps('subject')}
              required
            />
            <Textarea
              withAsterisk
              w={400}
              label="Content"
              placeholder="Content"
              {...form.getInputProps('content')}
              required
            />
            <Button type="submit" color="#78b29c">
              Send Email
            </Button>
          </Flex>
        </form>
      </Modal>
      <Grid.Col span={4} offset={2}>
        <Button size="xs" onClick={open} color="#78b29c">
          Notification
        </Button>
      </Grid.Col>
    </>
  )
}
