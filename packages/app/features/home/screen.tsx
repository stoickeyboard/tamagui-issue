import {
  Anchor,
  Button,
  H1,
  Label,
  Paragraph,
  Separator,
  Sheet,
  SizeTokens,
  styled,
  Switch,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'

function SwitchWithLabel(props: { size: SizeTokens }) {
  const id = `switch-${props.size.toString().slice(1)}`
  return (
    <XStack w={200} ai="center" space="$4">
      <Label pr="$0" miw={90} jc="flex-end" size={props.size} htmlFor={id}>
        Dark mode
      </Label>
      <Separator mih={20} vertical />
      <Switch id={id} size={'$10'}>
        <Switch.Thumb animation="quick" />
      </Switch>
    </XStack>
  )
}

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })

  const [val, setVal] = useState('one')

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
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
        </Paragraph>{' '}
        <YStack w={200} ai="center" space="$3">
          <SwitchWithLabel size="$2" />
          <SwitchWithLabel size="$3" />
          <SwitchWithLabel size="$4" />
          <SwitchWithLabel size="$5" />
        </YStack>
        <Button size="$4">Test 1</Button>
        <Button size="$6">Test 2</Button>
        <Button size="$10">Test 3</Button>
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>

      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
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
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
