'use client';
import { IconContainer } from '@/assets/images/icons';
import { Card, Icon } from '@/components/ui';
import { IContainer, IGroup } from '@/types/definition';

import Link from 'next/link';
import { useState } from 'react';

import { ContainerCardDropdownMenuTriggerButton } from './ContainerCardDropdownMenuTriggerButton';
import { RenameContainerForm } from './RenameContainerForm';

interface IContainerCardProps {
  /**
   * an identifier of container which each container card has
   */
  containerId: IContainer['id'];
  /**
   * an identifier of a group which the container(s) belong to
   */
  groupId: IGroup['id'];
  /**
   * the name of container which is in a container card
   */
  containerName: IContainer['name'];
}

export const ContainerCard = ({ containerId, groupId, containerName }: IContainerCardProps) => {
  const [isRenameFormOpen, setIsRenameFormOpen] = useState(false);

  /**
   * the function to change the state of rename form to true( = open the form input field)
   */
  const handleRenameClick = () => {
    setIsRenameFormOpen(true);
  };

  /**
   * The function to change the state of rename form to false ( = close the form input field)
   */
  const handleRenameFormClose = () => {
    setIsRenameFormOpen(false);
  };

  return isRenameFormOpen ? (
    <RenameContainerForm
      currentContainerName={containerName}
      isOpen={isRenameFormOpen}
      onClose={handleRenameFormClose}
    />
  ) : (
    <Card key={containerId} className="flex justify-between gap-2">
      <Link
        href={`/foods?group=${groupId}&container=${containerId}`}
        className="flex grow gap-4 items-center pl-4 py-2"
      >
        <div className="flex items-center justify-center bg-accent rounded-full w-11 h-11">
          <Icon icon={IconContainer} color="black" size={6} />
        </div>
        <span className="leading-5">{containerName}</span>
      </Link>
      <ContainerCardDropdownMenuTriggerButton onRenameClick={handleRenameClick} />
    </Card>
  );
};
