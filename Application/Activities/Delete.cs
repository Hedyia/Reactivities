using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistenece;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class CreateHandler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public CreateHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new Exception("Activity not found");

                _context.Activities.Remove(activity);

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                    return Unit.Value;
                throw new Exception("An error occured when saving an activity");
            }
        }
    }
}