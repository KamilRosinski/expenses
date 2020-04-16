package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class AccountingPeriodDTO {

	private Long id;

	private LocalDate startDate;

	private LocalDate endDate;

	private List<TransactionDTO> transactions;

}
