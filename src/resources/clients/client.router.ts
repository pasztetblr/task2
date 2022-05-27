import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Client from './client.model';

import clientsService from './client.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const users = await clientsService.getAll();

    res.json(users.map(Client.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { fullName, address, numberPhone, bonusCard } = req.body;
    const client = await clientsService.createClient({ fullName, address, numberPhone, bonusCard });

    if (client) {
      res.status(StatusCodes.CREATED).json(Client.toResponse(client));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'CLIENT_NOT_CREATE', msg: 'Client not create' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const client = await clientsService.getById(id || '');

    if (client) {
      res.json(Client.toResponse(client));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fullName, address, numberPhone, bonusCard } = req.body;

    const client = await clientsService.updateById({
      id: id || '',
      fullName,
      address,
      numberPhone,
      bonusCard,
    });

    if (client) {
      res.status(StatusCodes.OK).json(Client.toResponse(client));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const client = await clientsService.deleteById(id || '');

    if (!client) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'CLIENT_DELETED', msg: 'The client has been deleted' });
  }),
);

export default router;
