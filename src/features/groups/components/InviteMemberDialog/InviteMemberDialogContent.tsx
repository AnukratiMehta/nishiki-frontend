import { IconLink } from '@/assets/images/icons';
import {
  Button,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
} from '@/components/ui';
import { putGenerateInvitationLinkHash } from '@/lib/api/group/client/groupApiClient.client';

import { useEffect, useState } from 'react';

const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL || '';

/**
 * This component displays dialog which has copy button.
 * When it is clicked, the text changes to "Copied!"
 *
 * Its state is controlled by the `isDialogOpen` prop, which is passed from the parent component.
 *
 * @param props.isDialogOpen - state to control the visibility of dialog, if it is open => true, if not => false, this state is used to switch the text in button.
 * @param groupId - a unique Id as identfier of a group
 * @returns - The JSX code for rendering the dialog component.
 */
export const InviteMemberDialogContent = ({
  isDialogOpen,
  groupId,
}: {
  isDialogOpen: boolean;
  groupId: string;
}) => {
  const [isLinkButtonClicked, setIsLinkButtonClicked] = useState(false);

  /**
   * this function is onClick function when the `Button` clicked
   */
  const handleLinkCopy = async () => {
    const result = await putGenerateInvitationLinkHash(groupId);

    //narrowing if result is invalid, no implementation for now
    if (!result.ok) return;

    setIsLinkButtonClicked(true);
    const hash = result.value;

    return navigator.clipboard.writeText(CLIENT_BASE_URL + '/groups/join/' + hash);
  };

  /**
   * this is React Hook useEffect which changes the state of `isLinkButtonClicked` to false if the state of `isDialogOpen` changes
   *
   * `seTimeout` which enables you to change the state of `setIsLinkButtonClicked` to false 0.3 sec after the dependency change
   * The `setTimeout` is needed to remain text "copied" until the dialog disappears in order. Without it, the text would've change to "Copy Link" before dialog disappears.
   * the duration 0.3 is same as fadeIn/fadeOut ruled at `tailwind.config.ts`
   * dependency: the parameter of `InviteMemberDialogContent` which is checking the state of Dialog whether it's open/close(=true/false)
   */
  useEffect(() => {
    setTimeout(() => setIsLinkButtonClicked(false), 300);
  }, [isDialogOpen]);

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite users</DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 justify-center items-center pb-8">
          <Button
            disabled={isLinkButtonClicked}
            variant="primary"
            size="lg"
            onClick={handleLinkCopy}
            className="w-40 px-3.5"
          >
            <Icon icon={IconLink} size={5} color="white" />
            {isLinkButtonClicked ? 'Copied!' : 'Copy link'}
          </Button>
          <p className="text-center text-sm text-gray-dark">Your invite link expires in a day.</p>
        </DialogBody>
      </DialogContent>
    </>
  );
};
