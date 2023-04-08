import { Anchor, Button, H1, Input, Paragraph, Separator, Sheet, XStack, YStack } from '@my/ui'
import { Toast, ToastProvider, ToastViewport, useToast } from '@tamagui/toast'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useLink } from 'solito/link'

const CurrentToast = () => {
  const { currentToast } = useToast()

  console.log('CurrentToast', currentToast)

  // only show the component if it's present and not handled by native toast
  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      bc={'green'}
      animation="quick"
      px="$6"
      br="$3"
      w="65%"
    >
      <YStack>
        <Toast.Title color="white">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description color="white">{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  return (
    <ToastProvider>
      <ToastViewport flexDirection="column" top={0} left={0} right={0} mx="auto" />

      <YStack f={1} jc="center" ai="center" p="$4" space>
        <YStack space="$4" maw={600}>
          <H1 ta="center">Welcome to Tamagui.</H1>
          <Paragraph ta="center">
            Here's a basic starter to show navigating from one screen to another. This screen uses
            the same code on Next.js and React Native.
          </Paragraph>

          <Separator />
          <Paragraph ta="center">
            Made by{' '}
            <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
              @natebirdman
            </Anchor>
            ,{' '}
            <Anchor
              color="$color12"
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              rel="noreferrer"
            >
              give it a ⭐️
            </Anchor>
          </Paragraph>
        </YStack>

        <XStack>
          <Button {...linkProps}>Link to user</Button>
        </XStack>

        <SheetDemo />
      </YStack>
      <CurrentToast />
    </ToastProvider>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const { show } = useToast()
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay bc="black" />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            onPress={() => {
              show('Title', { message: 'Message' })
            }}
          >
            Toggle Toast
          </Button>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
