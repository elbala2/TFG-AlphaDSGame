from spade.behaviour import CyclicBehaviour
from spade.agent import Agent
import asyncio
import time
email = 'elbala2@jabbers.one'
password = 'laurita2'


class CustomImageDataset(Dataset):
  def __init__(self, states, actions = None):
    self.states = states
    self.actions = actions

  def __len__(self):
    return len(self.state)

  def __getitem__(self, idx):
    img_path = os.path.join(self.img_dir, self.img_labels.iloc[idx, 0])
    image = read_image(img_path)
    label = self.img_labels.iloc[idx, 1]
    if self.transform:
      image = self.transform(image)
    if self.target_transform:
      label = self.target_transform(label)
    return image, label


class DummyAgent(Agent):
  class MyBehav(CyclicBehaviour):
    async def on_start(self):
      print("Starting behaviour . . .")
      self.counter = 0

    async def run(self):
      print("Counter: {}".format(self.counter))
      self.counter += 1
      await asyncio.sleep(1)

  async def setup(self):
    print("Agent starting . . .")
    b = self.MyBehav()
    self.add_behaviour(b)


if __name__ == "__main__":
  dummy = DummyAgent(email, password)
  future = dummy.start()
  future.result()

  print("Wait until user interrupts with ctrl+C")
  try:
    while True:
      time.sleep(1)
  except KeyboardInterrupt:
    print("Stopping...")
  dummy.stop()
  quit_spade()
